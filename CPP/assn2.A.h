/*  assn2.A.h
 *  Purpose:    To demonstrate function overloading in C++
 *              This header calls the overloaded functions in assn2.B.h
 *              The STUDENT must prepare and submit the assn2.B.h file.
 *  Prepared by Marty Boogaart - 13 January 2010
 */

#include "assn2.B.h"
#include <iostream>
/*  Unless instructed otherwise, CIT1156 workers do
 *  NOT use "using namespace std;" in their header files!
 */

#define ASSN  "2"

// == Interface ===============================================================
/* Purpose: To demonstrate overloading where the number of parameters differ.
 * Preconditions: none. Postconditions: none.
 */
void runByNumber();
//-----------------------------------------------------------------------------

/* Purpose: To demonstrate overloading where the order of parameters differ.
 * Preconditions: none. Postconditions: none.
 */
void runByOrder();
//-----------------------------------------------------------------------------

/* Purpose: To demonstrate overloading where the type of parameters differ.
 * Preconditions: none. Postconditions: none.
 */
void runByType();
//-----------------------------------------------------------------------------

// == Implementation ==========================================================
void runByNumber() {
    // Greet user
    std::cout << "Example of POLYMORPHISM\n"
	          << "Signature differs by number of args.\n";

    // Call both functions with different number of parameters
    byNumber(1);
    byNumber(2, 3);
} // end of runByNumber() function
//-----------------------------------------------------------------------------

void runByOrder() {
    // Greet user
    std::cout << "Example of POLYMORPHISM; "
	          << "signature differs by order of args.\n";

    // Call both functions with a different number of parameters
    byOrder( 1   , 2.3 );
    byOrder( 4.5 , 6   );
} // end of runByOrder() function
//-----------------------------------------------------------------------------

void runByType() {
    // Greet user
    std::cout << "Example of POLYMORPHISM; "
	          << "signature differs by type of args.\n";

    // Call both functions with a different type of argument
    byType(   int(54321) );
    byType( float(9.876) );
} // end of runByType() function
//-----------------------------------------------------------------------------
