package kr.or.iei;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class JwtConfig {
	@Value("${jwt.secret}")
	private String secretKey;
	@Autowired
	private JwtUtil jwtUtil;
	
	@Bean //보안필터를 설정하는 객체를 만듦
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		return http
				.httpBasic().disable()				//HTTP 기본인증(사용자인증/비밀번호로 인증을 사용하지 않겠다)
				.csrf().disable().cors()			//csrf 공격을 비활성화
				.and()
				.authorizeRequests()				//요청에 대한 권한 설정
				//post 요청중에 /member/login, /member/join은 그냥 허용
				.antMatchers(HttpMethod.POST,"/member/login","/member/join").permitAll()
				//post 요청중에 /member/로 시작하면 반드시 인증을 하도록 설정
				.antMatchers(HttpMethod.POST,"/member/**","/board/insert").authenticated()
				.and()
				.sessionManagement()		//세션관련 설정
				//세션을 상태없는 상태로 운영 > JWT로 인증하는 경우 사용하는 설정
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
				.and()
				//필터를 통한 인증 승인 처리
				.addFilterBefore(new JwtFilter(secretKey, jwtUtil)
						, UsernamePasswordAuthenticationFilter.class)
				.build();
	}
}