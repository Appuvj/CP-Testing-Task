package StepDefinition;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;

import io.cucumber.java.en.*;

public class LoginSteps {
	
 static WebDriver driver;
 
 @Given("User is our login page")
 public void user_is_our_login_page() {
     // Write code here that turns the phrase above into concrete actions
	 
	 System.out.println("User is trying to log in");
		driver=new ChromeDriver();
	//	driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(30));
	    driver.get("https://www.saucedemo.com/v1/");
	 
	 
    
 }

 
 
 
 
//@Given("User is on login page")
//public void user_is_on_login_page() {
//    // Write code here that turns the phrase above into concrete actions
//  
//	
//	
//}

@When("User enters valid {string} and {string}")
public void user_enters_valid_and(String username, String password) {
    // Write code here that turns the phrase above into concrete actions
   
    System.out.println("when");
    
    driver.findElement(By.id("user-name")).sendKeys(username);
    driver.findElement(By.id("password")).sendKeys(password);
	
	
}

@And("clicks on login button")
public void clicks_on_login_button() {
    // Write code here that turns the phrase above into concrete actions
   
	System.out.println("And1");
	
	driver.findElement(By.id("login-button")).click();
	
}


@Then("user is navigated to the home page")
public void user_is_navigated_to_the_home_page() {
    // Write code here that turns the phrase above into concrete actions
    
	System.out.println("Then");
	
	Assert.assertTrue(driver.findElements(By.xpath("//div[@class='app_logo']")).size()>0,"user is navigated to ");
	
}

@And("Close the browser")
public void close_the_browser() {
    // Write code here that turns the phrase above into concrete actions
  
	System.out.println("And2");
	driver.close();
	
}
}
