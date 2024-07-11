package io.cal;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class CalculatorProjectTest {

	@Test
	void addtest() {
		
		CalculatorProject c= new CalculatorProject();
		
		int expected = 2;
		int actual = c.add(1, 1);
		
		assertEquals(expected, actual, "Add Function can calculate two integers ");
		
		
	}
	
	@Test
	void subtest() {
		
		CalculatorProject d= new CalculatorProject();
		
		int expected = 3;
		int actual = d.sub(5, 2);
		
		assertEquals(expected, actual, "Sub Function can calculate two integers ");
		
	}
	
	@Test
	void multest()
	{
	
	CalculatorProject e= new CalculatorProject();
	
	int expected = 10;
	int actual = e.mul(5, 2);
	
	assertEquals(expected, actual, "mul Function can calculate two integers ");
	
	}
	@Test
	void divtest()
	{
	
	CalculatorProject f= new CalculatorProject();
	
	int expected = 5;
	int actual = f.div(10, 2);
	
	assertThrows(NullPointerException.class, () ->f.div(10, 0), "div Function can calculate two integers ");
	assertEquals(expected, actual, "div Function can calculate two integers ");
	}
	
	
	@Test
	void AreaOfCircleTest()
	{
		CalculatorProject g = new CalculatorProject();
		assertEquals(314.1592653589793, g.AreaOfCircle(10));
	}
	
	void PostiveNumberTest()
	{
		CalculatorProject h = new CalculatorProject();
		
		
	}
	
	
	

}







