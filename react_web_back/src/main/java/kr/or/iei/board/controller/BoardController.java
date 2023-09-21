package kr.or.iei.board.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.iei.FileUtil;
import kr.or.iei.board.model.service.BoardSerivce;
import kr.or.iei.board.model.vo.Board;
import kr.or.iei.board.model.vo.BoardFile;

@RestController
@RequestMapping(value = "/board")
public class BoardController {
	@Autowired
	private BoardSerivce boardSerivce;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;

	@GetMapping(value = "/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = boardSerivce.boardList(reqPage);
		return map;
	}
	@PostMapping(value = "/insert")
	public int insertBoard(@ModelAttribute Board b, 
							@ModelAttribute MultipartFile thumbnail,
							@ModelAttribute MultipartFile[] boardFile, 
							@RequestAttribute String memberId) {
		b.setMemberId(memberId);
		String savepath = root+"board/";
		if (thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getFilepath(savepath, filename, thumbnail); //중복되지 않는 이름으로 업로드까지 완료
			b.setBoardImg(filepath);
		}
		ArrayList<BoardFile> fileList = new ArrayList<BoardFile>();
		if (boardFile != null) {
			for(MultipartFile file : boardFile) {
				String filename = file.getOriginalFilename();
				String filepath = fileUtil.getFilepath(savepath, filename, file);
				BoardFile bf = new BoardFile();
				bf.setFilename(filename);
				bf.setFilepath(filepath);
				fileList.add(bf);
			}
		}
		int result = boardSerivce.insertBoard(b,fileList);
		return result;
	}
}
