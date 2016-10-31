c======================================================================
c
c AUTHOR: Richard O'Brien
c
c Program: Sample.f
c
c Purpose: This program is a small FORTRAN application meant to SHOW
c          The essential features of the FORTRAN programming language. 
c          These include:
c                        
c                       
c                       
c                       * Formatted I/O
c                       * 3-way selection statements 
c                       * user-defined subprograms << subroutines >> 
c                       * character string handling 
c                       * logical loop control statements 
c                       * if-then-else statements 
c                       * modules << functions >>
c                       * dynamic arrays
c                       * case statements
c                       * parameter type checking.
c
c
c  POINTERS,RECURSION, AND TYPE-CHECKING ARE NOT SUPPORTED BY THE G77 COMPILER.
c
c
c       I will attempt to make a separate section in this application for
c each of these features, however, there will be some overlap.
c
c======================================================================
        program sample
        implicit none
        write(*,01)
        write(*,*) 'This program demonstrates the essential '
        write(*,*) 'features of the FORTRAN 77 programming language '
        write(*,01)
        call menu
 01     format(10(80('*'))) 
        end

c----------------------------------------------------------------
c-------END OF MAIN MODULE---------------------------------------
c----------------------------------------------------------------





        subroutine menu()
c----------------------------------------------------------------
c  a subroutine for user interface 
c----------------------------------------------------------------
C ok.  Menu time.... we loop unil user gets sick of playing.
        integer  choice 

        do while (choice.ne.10)  
        write(*,02) 
        write(*,*) ' ENTER AN INTEGER TO DEMONSTRATE THESE FEATURES:'
        write(*,*) ' (1) Formatted I/O'
        write(*,*) ' (2) 3-way selection statements'
        write(*,*) ' (3) user-defined subprograms << subroutines >>'
        write(*,*) ' (4) character string handling ' 
        write(*,*) ' (5) logical loop control statements ' 
        write(*,*) ' (6) if-then-else statements ' 
        write(*,*) ' (7) modules << functions >> ' 
        write(*,*) ' (8) dynamic arrays ' 
        write(*,*) ' (9) case statements ' 
        write(*,*) ' (10) QUIT ' 

 01     format(i2)
 02     format(5(80(' ')))
        read(*,01) choice

       select case (choice)
           case (1)
             call formattedIO 
           case (2)
             call threeway 
           case (3)
             call dumbsub 
           case (4)
             call stringsub
           case (5)
             call logicloopsub
           case (6)
             call ifthenelsesub
           case (7)
             call functionsub
           case (8)
             call dynarraysub
           case (9)
             call casesub
           case (10)
             write(*,*) "yOU CHOSE TO QUIT!!! YOU BASTARD!!" 
           case default
             write(*,*) "INVALID SELECTION" 
       end select
        write(*,02) 
       enddo
        write(*,*) 'Done'
        end
c----------------------------------------------------------------
c----------------------------------------------------------------
c----------------------------------------------------------------






        subroutine formattedIO()
c----------------------------------------------------------------
c  a subroutine to demo formatted I/O
c----------------------------------------------------------------
        character*11 fname 
        integer kode 
        integer  endchk
        integer  input
c___________________fields in data file______

        character*4  idnum
        character*14 xname
        character*3 xinit
        character*1 sex 
        character*2 age
c___________________fields in data file______
       

* intitialize status flags
        input=15
        kode=0
        endchk=0

 100    write(*,*)'Enter name of input file: '
        read(*,*) fname
        open(unit=input, file=fname, status='old',iostat=KODE)
        if(kode.ne.0) then
                write(*,*)fname, 'cannot be opened'
                go to 100
        end if
c read the records and write them


        do while (endchk.ne.8)  
           read(unit=input,FMT=666,END=69)idnum,xname,xinit,sex,age
           write(*,FMT=667) xinit,xname,age,sex,idnum
        enddo

* formatting
 666    format(i4.4 ,a14,a3,a1,a2,a15)
 667    format(a3,' ',a,"'s age is ",a2,', gender: ',a1,' id#: ',i4.4)
 69     endchk=8
        close(unit=input)
        end
c----------------------------------------------------------------




        subroutine threeway()
c----------------------------------------------------------------
c  a subroutine to demo 3-Way selection statements
c----------------------------------------------------------------
        integer in
        write(*,*)'enter a number: '
        read(*,*) in
        if ( in ) 10, 20, 30
 30     write(*,*)'you entered a positive number'
        goto 40
 20     write(*,*)'you entered a 0.'
        goto 40
 10     write(*,*)'you entered a negative number'
 40     end
c----------------------------------------------------------------





        subroutine dumbsub()
c----------------------------------------------------------------
c  a subroutine to demo a suboutine.
c----------------------------------------------------------------
        write(*,*)'this is a subroutine'
        write(*,*)'returning to main now'
        end
c----------------------------------------------------------------







        subroutine stringsub()
c----------------------------------------------------------------
c  a subroutine to demo string handling.
c----------------------------------------------------------------
        integer i,j, strlen
        character*80 string 
        character*80 backward
        write(*,*)'Enter String: '
        read (*,*) string
        strlen = length(string)
        write(*,*) string, "is ",strlen," chars long."
        i = 1 
        j = strlen 
        do while( i .le.  strlen) 

        backward(j:j) = string(i:i)

          i = i + 1
          j = j - 1

        enddo
        write(*,*)'BACKWARD STRING: ', backward(1:strlen)
        end
c----------------------------------------------------------------




        integer function length(string)
c----------------------------------------------------------------
c  a function to return string length for string handling.
c----------------------------------------------------------------
*     returns the length of a string
        character*(*) string
        integer i
        do 10, I = len(string), 1, -1
            if(string(i:i) .ne. ' ') go to 20
10      continue
20      length = i
        end
c----------------------------------------------------------------






        subroutine logicloopsub()
c----------------------------------------------------------------
c  a subroutine to demo logical loops.
c----------------------------------------------------------------
        character*7 user_guess
        character*7 answer
        parameter( answer ='fortran' )
        logical flag



        do while( answer .ne. user_guess )
        write(*,*)' What is you favorite programming language?'
        read(*,*)user_guess
        if( answer .ne. user_guess ) write(*,*)'WRONG!!!!!!!!!!'
        enddo
 
        
        write(*,*)'That''s right!! fortran is your favorite!!!'
        end
c----------------------------------------------------------------







        subroutine ifthenelsesub()
c----------------------------------------------------------------
c  a subroutine to demo logical loops.
c----------------------------------------------------------------
        integer num, guess
        num = 8
        
        write(*,*)'type 8 '
        read(*,*) guess

        if( guess .eq. num ) then 
            write(*,*)'that''s right' 
        else 
            write(*,*)'NO!!!!  TYPE 8!!'
        end if
        end 
c----------------------------------------------------------------






        subroutine functionsub()
c----------------------------------------------------------------
c  a subroutine to demo logical loops.
c----------------------------------------------------------------
        character*80 word
        
        write(*,*)' Enter a word, And I will tell you its length. '
        read(*,*) word
        write(*,*) word, "'s length is: "  ,length(word)
        end
c----------------------------------------------------------------





        subroutine allocatesub(n)
c----------------------------------------------------------------
c  a subroutine to demo dynamic arrays 
c----------------------------------------------------------------
        integer n
        real vector (n)
        do i=1,n
          vector (i) = i
        enddo
        print *, vector
        end
c----------------------------------------------------------------




        subroutine dynarraysub
c----------------------------------------------------------------
c  a subroutine to demo dynamic arrays 
c----------------------------------------------------------------
        write(*,*)'Array dimension?'
        read(*,*) n
        call allocatesub(n)
        end
c----------------------------------------------------------------



        subroutine casesub
c----------------------------------------------------------------
c  a subroutine to demo pointers 
c----------------------------------------------------------------
       integer what  
       
       
       write(*,*)'Choose a menu option from 1 to 3: '
       read(*,*) what
       select case (what)
           case (1)
            write(*,*)'You chose 1' 
           case (2)
            write(*,*)'You chose 2' 
           case (3)
            write(*,*)'You chose 3' 
           case default 
            write(*,*)'THAT IS NOT AN OPTION' 
       end select
       write(*,*) 'Case statement done.'
        end
        
c----------------------------------------------------------------

