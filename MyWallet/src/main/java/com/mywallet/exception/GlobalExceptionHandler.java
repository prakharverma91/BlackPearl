package com.mywallet.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.mywallet.util.ResponseUtil;

@ControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger execptionlogger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(value=NullPointerException.class)
	public ResponseEntity<Object> nullPointerExceptionHandler(NullPointerException e){
		execptionlogger.error(e.getMessage(), e);
		return ResponseUtil.errorResp("internal server problem occur please contaact admin",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	@ExceptionHandler(value=JpaSystemException.class)
	public ResponseEntity<Object> JpaSystemException(JpaSystemException e){
		execptionlogger.error(e.getMessage(), e);
		return ResponseUtil.errorResp("internal server problem occur please contaact admin",HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Object> DataIntegrityViolationException(DataIntegrityViolationException e){
		execptionlogger.error(e.getMessage(), e);
		return ResponseUtil.errorResp("internal server problem occur please contaact admin",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	

	@ExceptionHandler(value=Exception.class)
	public ResponseEntity<Object> Exception(Exception e){
		execptionlogger.error(e.getMessage(), e);
		return ResponseUtil.errorResp("internal server problem occur please contaact admin",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
