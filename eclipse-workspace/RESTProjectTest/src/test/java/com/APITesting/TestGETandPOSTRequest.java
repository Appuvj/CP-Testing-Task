package com.APITesting;

import org.json.simple.JSONObject;
import org.testng.Assert;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;  //make a static to RestAssured package

import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static io.restassured.matcher.RestAssuredMatchers.*;
import static org.hamcrest.Matchers.*;

import java.util.HashMap;
import java.util.Map;

public class TestGETandPOSTRequest {
	
	@Test
	public void GETRequest() {
		
		//1st validation by id
		baseURI="https://reqres.in/api";
		given().get("/unknown").then().statusCode(200).body("data[0].id",equalTo(1)).log().all();
		
		//2nd validation by name
		given().get("/unknown").
		then().statusCode(200).
		body("data[1].name",equalTo("fuchsia rose")).
		body("data[1].id",equalTo(2)).log().all();
			
	}
	
	public void GETRequest2() {
		
		baseURI="https://reqres.in/api";
		given().get("users?page=2").then().statusCode(200).body("data.firstname", hasItems("Lindsay","Tobias"));
		
	}
	
	public void POSTRequest() {
		
		Map<String,Object> map = new HashMap<String,Object>();
		
		JSONObject request = new JSONObject(map);
		
		request.put("name","vijay");
		request.put("Job","Developer");
		System.out.println(request.toJSONString());
		
		baseURI = "https://reqres.in/api";
		
		given().header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(request.toJSONString()).post("/users").then().statusCode(201).log().all();		
		
	}
	
	

}




















