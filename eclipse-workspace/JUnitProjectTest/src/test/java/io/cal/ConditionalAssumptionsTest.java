package io.cal;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledOnOs;
import org.junit.jupiter.api.condition.OS;

class ConditionalAssumptionsTest {

	@Test
	@EnabledOnOs(OS.LINUX)
	void testOperatingSys() {
		
		System.out.println("i'm vijay, i'm using windows 11");
	}
	
	void testValue()
	{
		ConditionalAssumptions c1= new ConditionalAssumptions();
		
		boolean val = false;
		assumeTrue(val);
		int expected=10;
		int actual=c1.value();
		assertEquals(expected, actual);
	}
	
	void testMultiply()
	{
		ConditionalAssumptions c1= new ConditionalAssumptions();
		
		assertAll(
				
				() ->assertEquals(4, c1.multiply(2, 2)),
				() ->assertEquals(0, c1.multiply(2, 0)),
				() ->assertEquals(-2, c1.multiply(2, -1))
				);
		
	}
	
	
	
	

}
