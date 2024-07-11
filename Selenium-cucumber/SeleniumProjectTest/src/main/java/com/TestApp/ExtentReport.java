package com.TestApp;

import java.io.IOException;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentHtmlReporter;

public class ExtentReport {
	
	private static WebDriver driver = null;
	
	public static void main(String[] args) throws IOException,InterruptedException{
	
	ExtentHtmlReporter htmlReporter = new ExtentHtmlReporter("extent.html");
	
	ExtentReports extent = new ExtentReports();
	extent.attachReporter(htmlReporter);
	
	ExtentTest test = extent.createTest("Google search Test1", "this is a test to validate Google search functionality");
	
	String path = System.getProperty("user.dir")+"\\reports\\index.html";
	
	test.log(Status.INFO,"Starting Test Case");
	driver = new FirefoxDriver();
	
	driver.get("http://localhost:3000/");
	test.pass("Navigated to react project");
	
	driver.findElement(By.xpath("//a[normalize-space()=\"Don't have an account? Sign Up\"]")).click();
	

	driver.findElement(By.xpath("//a[normalize-space()=\"Don't have an account? Sign Up\"]")).click();
	test.pass("test completed");
	
	driver.findElement(By.xpath("//input[@name='userName']")).sendKeys("Vijay Kumar");
	test.pass("test completed");

	driver.findElement(By.xpath("//input[@name='userContact']")).sendKeys("1236547890");
	test.pass("test completed");

	driver.findElement(By.xpath("//input[@name='userId']")).sendKeys("appuvj005@gmail.com");
	test.pass("test completed");

	driver.findElement(By.xpath("//input[@name='userPass']")).sendKeys("Appuvj@0513");
	test.pass("test completed");

	driver.findElement(By.xpath("//button[normalize-space()='Create Account']")).click();
	test.pass("test completed");
	
	extent.flush();	
	
	
	
	}

}
