AUD_19200  BAUD_38400  BAUD_56K  BAUD_128K  BAUD_115200  BAUD_57600  BAUD_USER  Description  Specifies a bitmask indicating the baud rates that can be used  dwSettableParams    	        +   
     J  R     ]  ú        uint32  BitValues    }      ¤  ¯  Ë  Ü   Parity checking  Baud rate  Data bits  Stop bits  Handshaking (flow control)  Parity checking  (receive-line-signal-detect)  Description  Specifies a bitmask indicating the communications parameter that can be changed  wcProvChar     @         
            ¤   uint8  Description  Specifies provider-specific data. Applications should ignore this member unless they have detailed information about the format of the data required by the provider.  wPacketLength                
               uint16  Description  Specifies the size, in bytes, of the entire data packet, regardless of the amount of data requested  wPacketVersion              
     <  D     Q   uint16  Description  Specifies the version of the structure  wSettableData     (      +   
     Á  É     Ô  c     p   uint16  BitValues    đ  ũ  
    $  2   5 data bits  6 data bits  7 data bits  8 data bits  16 data bits  Special wide path through serial hardware lines  Description  Specifies a bitmask indicating the number of data bits that can be set  wSettableStopParity     *      +   
              ¤     ą   uint16  BitValues    =  I  X  e  p  |       1 stop bit  1.5 stop bits  2 stop bits  No parity  Odd parity  Even parity  Mark parity  Space parity  Description  Specifies a bitmask indicating the stop bit and parity settings that can be selected.               Ėš[yFÎ\                         ˙˙              '   MSParallel  AMENDMENT  LOCALE  ms_409          
   M S P a r a l l e l Íš[yFÎå       	       MSParallel    6         )          >      ˙˙I      Q     Y  h  ę  õ  U˙˙˙˙˙˙˙˙m  MSParallel_AllocFreeCounts  Description  The allocate and free counts track the port sharing of the parallel port. If the allocate count equals the free count then the port is idle. If the allocate count is greater than the free count (free count + 1) then some other driver in the system has acquired exclusive access to that port. If the allocate count stays constant at freecount+1 for an arbitrarily long period of time, then some driver may have illegally locked the port preventing other drivers from accessing the port.  DisplayName  Parallel Port Alloc Free Counts  AMENDMENT  LOCALE  ms_409  PortAllocates             +   
     Ą  Š     ļ  Æ     Ķ   uint32  DisplayName  Port Allocates  Description  Port allocation count  PortFrees           +   
     .  6     C  O     \   uint32  DisplayName  Port Frees  Description  Port free count      or      E v e n t T r a c e E v e n t _ V 1 Úš[yFÎ/       '       EventTraceEvent_V1    6         ,   J      Y   ~       ˙˙                Ĩ   ō   ū   K  W  ¤  °  ũ  	  V  b  ¯  ģ      WUũ˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙a  Header_Extension_V1_TypeGroup  Description  Event Trace Header Extension  EventTypeName    e   p    Extension  EndExtension  AMENDMENT  LOCALE  ms_409  GroupMask1              
     Ņ   Ų      æ    uint32  Description  GroupMask1  GroupMask2              
     *  2     ?   uint32  Description  GroupMask2  GroupMask3              
               uint32  Description  GroupMask3  GroupMask4              
     Ü  ä     ņ   uint32  Description  GroupMask4  GroupMask5              
     5  =     J   uint32  Description  GroupMask5  GroupMask6              
            Ŗ   uint32  Description  GroupMask6  GroupMask7              
     į  ī     ü   uint32  Description  GroupMask7  GroupMask8               
     @  H     U   uint32  Description  GroupMask8                                                                                                          × Ā   Û      %-         Ū ĸ        g6 Ž        u? ˛  =      Õ# ī        žö ķ  é       Ü        ÕQ ā  ¯      }ë   Æ      Ė	 U                        
   P r o c e s s _ V 3 īš[yFÎ¯       +       Process_V3    6         $   ?      N          ˙˙          	   Ļ   ŗ       j  v  Ã  Ō  "  ,  w    Î  Ų  %  7      WUõ˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙Ũ  Process_V3_TypeGroup1  Description  Process Create/Exit Event  EventTypeName    f   m   r   {       Start  End  DCStart  DCEnd  Defunct  AMENDMENT  LOCALE  ms_409  CommandLine    	 $         
     ß   į      ô    string  Description  CommandLine  DirectoryTableBase              
     A  I     V   uint32  Description  DirectoryTableBase  ExitStatus              
     ĸ  Ē     ˇ   sint32  Description  ExitStatus  ImageFileName               
     ū          string  Description  ImageFileName  ParentId              
     X  `     m   uint32  Description  ParentId  ProcessId              
     Ž  ļ     Ã   uint32  Description  ProcessId  SessionId              
               uint32  Description  SessionId  UniqueProcessKey              
     c  k     x   uint32  Description  UniqueProcessKey  UserSID              
     ŋ  Į     Ô   object  Description  UserSID              M S N T _ S y s t e m T r a c e đš[yFÎĪ               MSNT_SystemTrace    6            4      A   J       ˙˙U       ]       S˙˙˙˙e   Process_V4  Description  Process Create/Exit Event  DisplayName  Process  AMENDMENT  LOCALE  ms_409           
   P r o c e s s _ V 4 ņš[yFÎā       3       Process_V4    6         $   ?      N          ˙˙             Ļ   ĩ       `  t  É  Õ  "  )  q    Đ  á  3  =      ß  ę  6  H    ¤  UUU˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙î  Process_V4_TypeGroup1  Description  Process Create/Exit Event  EventTypeName    f   m   r   {       Start  End  DCStart  DCEnd  Defunct  AMENDMENT  LOCALE  ms_409  ApplicationId     ,         
     á   é      ö    string  Description  ApplicationId  CommandLine    	 $         
     >  F     S   string  Description  CommandLine  DirectoryTableBase              
        ¨     ĩ   uint32  Description  DirectoryTableBase  ExitStatus              
       	        sint32  Description  ExitStatus  Flags @              
     U  ]     j   uint32  Description  Flags  ImageFileName               
     Ŧ  ´     Á   string  Description  ImageFileName  PackageFullName    
 (         
            "   string  Description  PackageFullName  ParentId              
     i  q     ~   uint32  Description  ParentId  ProcessId              
     ŋ  Į     Ô   uint32  Description  ProcessId  SessionId              
            +   uint32  Description  SessionId  UniqueProcessKey              
     t  |        uint32  Description  UniqueProcessKey  UserSID              
     Đ  Ø     å   object  Description  UserSID              M S N T _ S y s t e m T r a c e ōš[yFÎĖ               MSNT_SystemTrace    6   	         1      >   G       ˙˙R       Z       S˙˙˙˙b   Process  Description  Process Create/Exit Event  DisplayName  Process  AMENDMENT  LOCALE  ms_409              P r o c e s s ķš[yFÎ       <       Process 	   6         )   ?      N   _       ˙˙j       r      z      Ų   æ   4  H    Š  ö     K  R    Š  ų  
  \  f  ą  ŧ      _  q  Ä  Í  UUUũ˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙  Process_Defunct_TypeGroup1  Description  Process Zombie Event  EventTypeName    V    Defunct  AMENDMENT  LOCALE  ms_409  ApplicationId     ,         
     ĩ   Ŋ      Ę    string  Description  ApplicationId  CommandLine    	 $         
            '   string  Description  CommandLine  DirectoryTableBase              
     t  |        uint32  Description  DirectoryTableBase  ExitStatus              
     Õ  Ũ     ę   sint32  Description  ExitStatus  ExitTime     0         
     ,  4     A   uint64  Description  ExitTime  Flags @              
     ~          uint32  Description  Flags  ImageFileName               
     Õ  Ũ     ę   string  Description  ImageFileName  PackageFullName    
 (         
     6  >     K   string  Description  PackageFullName  ParentId              
            §   uint32  Description  ParentId  ProcessId              
     č  đ     ũ   uint32  Description  ProcessId  SessionId              
     ?  G     T   uint32  Description  SessionId  UniqueProcessKey              
       Ĩ     ˛   uint32  Description  UniqueProcessKey  UserSID              
     ų          object  Description  UserSID              M S N T _ S y s t e m T r a c e ôš[yFÎĖ               MSNT_SystemTrace    6            2      ?   G       ˙˙R       Z       S˙˙˙˙b   Thread_V0  Description  Thread Create/Exit Event  DisplayName  Thread  AMENDMENT  LOCALE  ms_409           	   T h r e a d _ V 0 õš[yFÎŋ              Thread_V0    6         #   =      L   |       ˙˙                ĸ   î   ų   W˙˙˙˙˙˙˙˙˙˙˙˙D  Thread_V0_TypeGroup1  Description  Thread Create/Exit Event  EventTypeName    `   g   l   u    Start  End  DCStart  DCEnd  AMENDMENT  LOCALE  ms_409  ProcessId              
     Î   Ö      ã    uint32  Description  ProcessId  TThreadId              
     %  -     :   uint32  Description  ThreadId              M S N T _ S y s t e m T r a c e öš[yFÎĖ               MSNT_SystemTrace    6            2      ?   G       ˙˙R       Z       S˙˙˙˙b   Thread_V1  Description  Thread Create/Exit Event  DisplayName  Thread  AMENDMENT  LOCALE  ms_409           	   T h r e a d _ V 1 ÷š[yFÎ       (       Thread_V1    6         #   =      L   s       ˙˙~          	         å   đ   <  H       ė  ÷  B  Q  Ą  ą      V  f  WUõ˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙˙ˇ  Thread_V1_TypeGroup1  Description  Thread Create/Exit Event  EventTypeName    \   c   l    Start  DCStart  DCEnd  AMENDMENT  LOCALE  ms_409  ProcessId              
     Å   Í      Ú    uint32  Description  ProcessId  StackBase              
       $     1   uint32  Description  StackBase  StackLimit              
     t  |        uint32  Description  StackLimit  StartAddr              
     Ė  Ô     á   uint32  Description  StartAddr  TThreadId              
     #  +     8   uint32  Description  ThreadId  UserStackBase              
     }          uint32  Description  UserStackBase  UserStackLimit              
     Ũ  å     ō   uint32  Description  UserStackLimit  WaitMode    	 $         
     8  ?     L   sint8  Description  WaitMode  Win32StartAddr               
            §   uint32  Description  Win32StartAddr           	   T h r e a d _ V 1 øš[yFÎ              Thread_V1    6         #   =      L   Y       ˙˙d       l      t      Ë   Ö   W˙˙˙˙˙˙˙˙˙˙˙˙!  Thread_V1_TypeGroup2  Description  Thread Create/Exit Event  EventTypeName    T    End  AMENDMENT  LOCALE  ms_409  ProcessId              
     Ģ   ŗ      Ā    uint32  Description  ProcessId  TThreadId              
       
        uint32  Description  ThreadId           	   T h r e a d _ V 2 ē[yFÎ\       	       Thread_V2    6         (   H      W   o       ˙˙z                   W˙˙˙˙˙˙˙˙í   WorkerThread_StartStop_V2  Description  Worker Thread Start/Stop Event  EventTypeName    c   j    Start  End  AMENDMENT  LOCALE  ms_409  CallbackRoutine              
     Į   Ī      Ü    uint32  Description  CallbackRoutine                                                ons    ü0     	1   Description  Allows or Denies new TS Connections. The second parameter is optional, if specified and set to TRUE, then enables or disables Remote Desktop firewall exception rule depending on whether AllowTSConnections is true or false respectively. Ô   37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           k       	                ˙˙   *      č   Z  ˙˙˙˙˙˙˙˙  __PARAMETERS  abstract                  AllowTSConnections  uint32                 
     >    In                 
     >   e       ˙˙ ID              )   
     Î   e       ˙˙           uint32                ModifyFirewallException  uint32               
        In               
       (      ˙˙ ID            )   
       (      ˙˙V         uint32                                                                                                                                                       __      37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           &                       ˙˙   *   k   ˙˙˙˙   __PARAMETERS  abstract                  ReturnValue  uint32                 
     ^    uint32  out                 
     ^   f       ˙˙                                                                                                 __    SetSingleSession    6     6   Description  Enables or disables the SingleSession state. !   37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           ¸                       ˙˙   *      ˙˙˙˙Ņ   __PARAMETERS  abstract                  SingleSession  uint32                 
     9    In                 
     9   `       ˙˙ ID              )   
     É   `       ˙˙           uint32                                                                                                                                                                                        __      37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           &                       ˙˙   *   k   ˙˙˙˙   __PARAMETERS  abstract                  ReturnValue  uint32                 
     ^    uint32  out                 
     ^   f       ˙˙                                                                                                 __    SetDisableForcibleLogoff    ĸ:     ¯:   Description  Enables or disables logging off an administrator who is logged on to the console. 9   37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           Đ                       ˙˙   *      ˙˙˙˙Ų   __PARAMETERS  abstract                  DisableForcibleLogoff  uint32                 
     A    In                 
     A   h       ˙˙ ID              )   
     Ņ   h       ˙˙           uint32                                                                                                                                                                                                        __      37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           &                       ˙˙   *   k   ˙˙˙˙   __PARAMETERS  abstract                  ReturnValue  uint32                 
     ^    uint32  out                 
     ^   f       ˙˙                                                                                                 __    SetProfilePath    ķ>      ?   Description  Sets the ProfilePath for the machine.    37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           ˛                       ˙˙   *      ˙˙˙˙Ī   __PARAMETERS  abstract                  ProfilePath  string                 
     7    In                 
     7   ^       ˙˙ ID              )   
     Į   ^       ˙˙           string                                                                                                                                                                                    __      37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           &                       ˙˙   *   k   ˙˙˙˙   __PARAMETERS  abstract                  ReturnValue  uint32                 
     ^    uint32  out                 
     ^   f       ˙˙                                                                                                 __    SetHomeDirectory    üB     	C   Description  Sets the Home Directory for the machine. !   37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           ¸                       ˙˙   *      ˙˙˙˙Ņ   __PARAMETERS  abstract                  HomeDirectory  string                 
     9    In                 
     9   `       ˙˙ ID              )   
     É   `       ˙˙           string                                                                                                                                                                                        __      37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           &                       ˙˙   *   k   ˙˙˙˙   __PARAMETERS  abstract                  ReturnValue  uint32                 
     ^    uint32  out                 
     ^   f       ˙˙                                                                                                 __    SetPolicyPropertyName    G      G   Description  PropertyName is a string property and is either DeleteTempFolders or UseTempFolders.They are flags that are either set to False or True according as whether Value is set to 0 or 1 respectively. The call returns 0 for success and an error if the policy was set to Group policy. Ŗ   37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           :                       ˙˙   *      â   C  ˙˙˙˙˙˙  __PARAMETERS  abstract                  PropertyName  string                 
     8    In                 
     8   _       ˙˙ ID              )   
     Č   _       ˙˙           string                Value  boolean               
     é    In               
     é         ˙˙ ID            )   
     z        ˙˙?         boolean                                                                                                                              __      37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           &                       ˙˙   *   k   ˙˙˙˙   __PARAMETERS  abstract                  ReturnValue  uint32                 
     ^    uint32  out                 
     ^   f       ˙˙                                                                                                 __    SetFallbackPrintDriverType    L     ĒL   Description  Sets the FallBack printer driver to one of:  0=No fallback print drivers, 1=Best guess, 2 = Best guess and if no match is found fallback to PCL, 3=Best guess and if no match is found fallback to PS,  4=Best guess and if no match is found show both PCL and PS drivers. ?   37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           Ö                       ˙˙   *      ˙˙˙˙Û   __PARAMETERS  abstract                  FallbackPrintDriverType  uint32                 
     C    In                 
     C   j       ˙˙ ID              )   
     Ķ   j       ˙˙           uint32                                                                                                                                                                                                            __      37L4247F29-24  ROOT\cimv2\TerminalServices\ms_409     ˙˙˙˙                           &                       ˙˙   *   k   ˙˙˙˙   __PARAMETERS  abstract                  ReturnValue  uint32                 
  B °   ķ      Ë/ Ŗ         Ē  f      3ũ 
  t      Õô   ģ      ;V ? 