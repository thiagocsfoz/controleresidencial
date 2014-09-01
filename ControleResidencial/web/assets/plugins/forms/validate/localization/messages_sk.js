#pragma classflags("forceupdate")
#pragma namespace("\\\\.\\root\\WMI")
//
// WPP Generated File
// PDB:  e:\idc\ntidc\nt.obj.x86fre\net\irda\sys\objfre\i386\irda.pdb
// PDB:  Last Updated :2006-3-8:10:29:10:368 (UTC) [binplace]
//

//ModuleName = IrDAProtocolDriver	 (Init called in Function DriverEntry)
[Dynamic,
 Description("IrDA Protocol Driver"),
 guid("{2D333977-52E1-4886-801F-2D59EB8060AF}"),
 locale("MS\\0x409")]
class IrDAProtocolDriver : EventTrace
{
    [Description ("Enable Flags"),
        ValueDescriptions{
             "DBG_0x00000001 Flag",
             "DBG_NDIS Flag",
             "DBG_TIMER Flag",
             "DBG_IRMAC Flag",
             "DBG_0x00000010 Flag",
             "DBG_IRLAP Flag",
             "DBG_IRLAPLOG Flag",
             "DBG_RXFRAME Flag",
             "DBG_TXFRAME Flag",
             "DBG_IRLMP Flag",
            