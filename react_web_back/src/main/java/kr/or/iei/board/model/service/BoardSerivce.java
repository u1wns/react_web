package kr.or.iei.board.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.iei.PageInfo;
import kr.or.iei.Pagination;
import kr.or.iei.board.model.dao.BoardDao;
import kr.or.iei.board.model.vo.Board;
import kr.or.iei.board.model.vo.BoardFile;
import kr.or.iei.member.model.dao.MemberDao;
import kr.or.iei.member.model.vo.Member;

@Service
public class BoardSerivce {
	@Autowired
	private BoardDao boardDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private MemberDao memberDao;
	
	public Map boardList(int reqPage) {
		//게시물 조회, 페이징에 필요한 데이터를 취합
		int numPerpage = 12; //한 페이지당 게시물 수
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = boardDao.totalCount(); //전체 게시물 수
		//페이징 조회 및 페이지 네비 제작에 필요한 데이터를 객체로 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerpage, pageNaviSize, totalCount);
		List boardList = boardDao.selectBoardList(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("boardList", boardList);
		map.put("pi", pi);
		return map;
	}
	@Transactional
	public int insertBoard(Board b, ArrayList<BoardFile> fileList) {
		System.out.println(b); 
		System.out.println(fileList);
		//작성자 정보를 현재 아이디만 알고있음 > Board테이블에는 회원번호가 외래키로 설정되어있음
		//아이디를 이용해서 번호를 구해옴(회원저옵를 조회해서 회원 정보 중 번호를 사용)
		Member member = memberDao.selectOneMember(b.getMemberId());
		b.setBoardWriter(member.getMemberNo());
		int result = boardDao.insertBoard(b);
		for(BoardFile boardFile : fileList) {
			boardFile.setBoardNo(b.getBoardNo());
			result += boardDao.insertBoardFile(boardFile);
		}
		if(result == 1+fileList.size()) {
			return result;
		}else {
			return 0;
		}
	}
	public Board selectOneBoard(int boardNo) {
		Board b = boardDao.selectOneBoard(boardNo);
		//List fileList = boardDao.selectOneBoardFile(boardNo);
		//b.setFileList(fileList);
		
		return b;
	}
	public BoardFile getBoardFile(int boardFileNo) {
		
		return boardDao.getBoardFile(boardFileNo);
	}
	@Transactional
	public List<BoardFile> delete(int boardNo) {
		List<BoardFile> list = boardDao.selectBoardFileList(boardNo);
		int result = boardDao.deleteBoard(boardNo);
		if(result > 0 ) {
			return list;
		}
		return null; //삭제 실패
	}
}
