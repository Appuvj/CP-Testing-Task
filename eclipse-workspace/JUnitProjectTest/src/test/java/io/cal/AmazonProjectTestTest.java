package io.cal;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class AmazonProjectTestTest {

	@Test
	void testAmazonTagLine() {
		
		String expected= "Spend less. Smile more";
		String actual= "Spend less. Smile more";
		
		assertEquals(expected, actual);
		assertSame(expected, actual, "expected result should match with actual");
		
		
	}
	
	

}
