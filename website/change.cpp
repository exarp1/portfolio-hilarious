/*
*	FILENAME				obrien.cpp
*
*	PURPOSE					to demonstrate:
*								*Classes
*								*Friend functions
*								*Operator Overloading
*
*	AUTHOR					Richard O'Brien - s0460356
*
*	DATE					2014 / 4 / 10
*/




// PRECOMPILER DIRECTIVES /////////////////////////////////////////////////////
#include	<iostream>
#include	<string>
#include	<iomanip>

#define		FIRST	"Richard"
#define		LAST	"O'Brien"

using namespace std;
///////////////////////////////////////////////////////////////////////////////




// INTERFACE //////////////////////////////////////////////////////////////////
/*
PURPOSE			This class contains functions and data variables to make change
				The user will enter an amount of pennies, and the makeChange()
				function will divide that amount into toonies, loonies, etc.
				until pennies remain. Overloaded << insertion operator will 
				then output the best change (least amount of coins necessary) 
				in units of Toonies, Loonies, etc. in descending order.
*/
class Change 
{
public:
	//	Constructor / Destructor

	//	Default
	Change()
		:cents(0),toonies(0),loonies(0),quarters(0),
		dimes(0),nickels(0),pennies(0){}

	//	Parameterized Constructor
	Change(int n)
		:cents(n),toonies(0),loonies(0),quarters(0),
		dimes(0),nickels(0),pennies(0){}
		
	//	Destructor
	~Change(){};

	//	Mutator
	void setChange();

	//	Friend function / Overloaded insertion operator
	friend ostream &operator << (ostream &lhs, Change &rhs);

private:
	//	Data members to store hidden information
	int toonies;
	int loonies;
	int quarters;
	int dimes;
	int nickels;
	int pennies;
	int cents;
};
///////////////////////////////////////////////////////////////////////////////




// IMPLEMENTATION /////////////////////////////////////////////////////////////
void Change::setChange()
/*
PURPOSE:			Calculate the best change by dividing the total cents input
					by the user into denominations such as Toonies and loonies.

PRECONDITIONS:		For this function to produce useful output, input must be:
						* integer
						* single
						* numeric only
						* in range of integer primitive type

POSCONDITIONS:		After this function completes, these conditions will exist:
						* The total change will be divided into denominations
						* Each denomination will be the maximum possible value
						* The private member variables will be assigned
						* The insertion operator << now has data to output.

SIDE EFFECTS:		This function is unlikely to change other member data.
*/
{
	//	Divide up the remaining change into toonies
	toonies		= (cents / 200);

	//	Divide up the remaining change into loonies
	loonies		= (cents % 200) / 100;

	//	Divide up the remaining change into quarters
	quarters	= (cents % 200 % 100 ) / 25;

	//	Divide up the remaining change into dimes
	dimes		= (cents % 200 % 100 % 25) / 10;

	//	Divide up the remaining change into nickels
	nickels		= (cents % 200 % 100 % 25 % 10) / 5;

	//	Divide up the remaining change into pennies
	pennies		= (cents % 5);
}


ostream &operator << (ostream &lhs, Change &rhs)
/*
PURPOSE:        Overload the insertion operator so that it performs an 
				insertion task on the private members of a Change object
				as though it were a primitave data type. Specifically; this
				function will output the Change for the pennies entered, 
				based on the components contained within the object:
				<toonies><loonies><quarters><dimes><nickels><pennies>

PRECONDITIONS:  The private member variables will have been initialized to
				sane values. This is handled by the constructor.

POSTCONDITIONS: The values contained in the constructed object's member
                variables:will have been output to the stream (probably cout) 
				in the above order, separated by carriage returns, in a
				readable format, using a width of 2 for each denomination

SIDE-EFFECTS:   None Known.
*/
{
	//	Output each denomination value, if above zero, with grammar.
	lhs <<	"The best change for " << rhs.cents << " cents is:\n";
	if(rhs.toonies > 0)
		lhs <<	"\t" << setw(3) << rhs.toonies 
		<<  ((rhs.toonies > 1) ? " toonies\n" : " toonie\n");
	if(rhs.loonies > 0)
		lhs <<	"\t" << setw(3) << rhs.loonies
		<<  ((rhs.loonies > 1) ? " loonies\n" : " loonie\n");
	if(rhs.quarters > 0)
		lhs <<  "\t" << setw(3) << rhs.quarters
		<<  ((rhs.quarters > 1) ? " quarters\n" : " quarter\n");
	if(rhs.dimes > 0)
		lhs <<	"\t" << setw(3) << rhs.dimes
		<<  ((rhs.dimes > 1) ? " dimes\n" : " dime\n");
	if(rhs.nickels > 0)
		lhs <<	"\t" << setw(3) << rhs.nickels
		<<  ((rhs.nickels > 1) ? " nickels\n" : " nickel\n");
	if(rhs.pennies > 0)
		lhs <<	"\t" << setw(3) << rhs.pennies
		<<  ((rhs.pennies > 1) ? " pennies\n" : " penny\n");

	//	Return the stream.
	return lhs;
}
///////////////////////////////////////////////////////////////////////////////



// DRIVER FUNCTION ////////////////////////////////////////////////////////////
int main()
{
	//	Greet User
	cout << "Canadian Coins Change Maker \n"
		 << "Prepared by " << FIRST << ' ' << LAST << "\n\n"
		 << "Returns # of Toonies, Loonies, Quarters, Dimes, "
		 << "Nickles, & Pennies\n\n"
		 << "Please enter the amount of change required (in pennies):";

	//	Get the amount (in pennies) to convert into change
	int pennies;
	cin >> pennies;

	//	Check if the user has entered invalid input.
	if(cin.fail()) 
	{
	cout << "\n\tYou did not enter an integer number.\n"
		 << "\tYou are very very bad! Now exiting.\n\n";
	system("pause");
	return -1;
    }

	//	Instantiate a Change object, using the amount entered.
	Change amount(pennies);

	//	Calculate the best change we can make from that amount
	amount.setChange();

	//	Output the best change based on the amount entered
	cout << amount;

	//	Exit gracefully
	cout << "\n\nAll done. Press any key to continue . . .";
	cin.sync();
	cin.get();


	return 0;
}