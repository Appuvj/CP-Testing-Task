package io.cal;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.TestReporter;

class AmazonCreateAnAccountPageTest {

//	@Test
	void testYourName() {
		
		AmazonCreateAnAccountPage a=new AmazonCreateAnAccountPage();
		
		
		String expectedFirstname="vijay";
		String expectedLastname="kumar";
		
		String actualResult = a.YourName(expectedFirstname,expectedLastname);
		assertSame(a.YourName(expectedFirstname,expectedLastname),actualResult,"please");
		assertEquals(a.YourName(expectedFirstname,expectedLastname), actualResult);
	}
	
	@Test
	void MobNoAndEmailID()
	{
		AmazonCreateAnAccountPage b=new AmazonCreateAnAccountPage();
		
		long expectedMobNo = 1234567890L;
		String expectedEmailID= "appuvj@gmail.com";
		
		String actualResult= b.MobNoAndEmailID(expectedMobNo,expectedEmailID);
	
		
		assertEquals(b.MobNoAndEmailID(expectedMobNo,expectedEmailID), actualResult);
	}
	
	@Test
	void CheckPassword()
	{
		AmazonCreateAnAccountPage c=new AmazonCreateAnAccountPage();
		
		String Password="Appuvj"; 
		boolean expectedPassword=true;
		
		boolean actualResult = c.CheckPassword(Password);
		
		assertEquals(expectedPassword, actualResult,"please enter the valid password");
		
	}
	
	private boolean isValidPassword(String password)
	{
		return password.length() == 6;
	}
	
	@Test
	String testInvalidPassword()
	{
		String shortpassword = "12345";
		String longpassword= "1234567";
		String isValid= "123456";
		String isInValid=(shortpassword+longpassword);
		
		String expected ="123456";
		String actual="123456";
		
		boolean isShortValid = isValidPassword(shortpassword);
		boolean isLongValid = isValidPassword(longpassword);
		assertFalse(isShortValid,"password should be exactly 6 characters long");
		assertFalse(isLongValid,"password should be exactly 6 characters long");
		
		assertEquals(expected, actual);
		
		if(isValid.length()==6)
		{
			assertSame(expected, actual,"strong password");
		}
		
		else
		{
			return isInValid;
		}
		
		return null;
		
		
	}
	
	@Test
	void testContinueButton() {
		
		AmazonCreateAnAccountPage d=new AmazonCreateAnAccountPage();
		
		String name ="vijay kumar";
		String email="vijay@gmail.com";
		String password="Appuvj@0513";
		
		boolean result = d.clickContinue(name ,email,password);
		
		assertTrue(result);	
	}
	
	AmazonCreateAnAccountPage t;
	TestInfo testinfo;
	TestReporter testReporter;
	
	@Test
	@Tag("testYourName")
	@Tag("MobNoAndEmailID")
	@Tag("CheckPassword")
	@Tag("testContinueButton")
	void init(TestInfo testinfo,TestReporter testReporter)
	{
		t= new AmazonCreateAnAccountPage();
		this.testinfo = testinfo;
		this.testReporter = testReporter;
		testReporter.publishEntry("tested all AmazonCreateAnAccountPage fields success" + testinfo.getTags());
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
