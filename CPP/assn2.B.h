/*
*	FILENAME				assn2.B.h
*
*	PURPOSE					to demonstrate function overloading
							to demonstrate precompiler #define macros
							to demonstrate the use of custom user headers
							to demonstrate using the scope resolution operator
*
*	AUTHOR					Richard O'Brien - s0460356
*
*	DATE					2014 / 1 / 13
*/

#include <iostream>

// Define FIRST (first name), LAST (last name), and DATE
// These vaules will be substituted in the intro output when compiled.
#define FIRST "Richard"
#define LAST "O'Brien"
#define DATE "13 January 2014"

// == Interface ===============================================================
	void byNumber(int firstNum, int secondNum);
	void byNumber(int firstNum);
	void byOrder( int firstNum   , double secondNum);
    void byOrder( double firstNum , int secondNum);
	void byType( int firstNum);
    void byType( float firstNum);
//-----------------------------------------------------------------------------

// == Implementation ==========================================================

//-----------------------------------------------------------------------------