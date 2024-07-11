package pageFactory;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePageFactory {
	
	WebDriver driver;
	
	@FindBy(xpath = "//*[name()='path' and contains (@fill, 'currentcol')]")
	WebElement lbl_cart;
	
	public void cartIconIsDisplayed() {
		lbl_cart.isDisplayed();
	}
	
	public HomePageFactory(WebDriver driver) {
		
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}

}
