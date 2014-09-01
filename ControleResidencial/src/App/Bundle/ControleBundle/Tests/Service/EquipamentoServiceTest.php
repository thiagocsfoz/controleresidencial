 switch
    }
    *Option: GlossyPaper
    {
        *rcNameID: =FXPCL_MEDIA_LIGHT_GLOSSY_CARDSTOCK
        *switch: InputBin
        {
            *case: MPF
            {
                *Command: CmdSelect
                {
                    *Order: JOB_SETUP.4
                    *Cmd: =FX_APSP_OFF =FX_MSIP_COATEDPAPER2
                }
            }
            *default:
            {
                *Command: CmdSelect
                {
                    *Order: JOB_SETUP.4
                    *Cmd: =FX_APSP_COATEDPAPER2 =FX_MSIP_COATEDPAPER2
                }
            }
        } *% End of switch
    }
    *Option: ThickGlossyPaper
    {
        *rcNameID: =FXPCL_MEDIA_HEAVY_GLOSSY_CARDSTOCK
        *switch: InputBin
        {
            *case: MPF
            {
                *Command: CmdSelect
                {
                    *Order: JOB_SETUP.4
                    *Cmd: =FX_APSP_OFF =FX_MSIP_COATEDPAPER3
                }
            }
            *default:
            {
                *Command: CmdSelect
                {
                    *Order: JOB_SETUP.4
                    *Cmd: =FX_APSP_COATEDPAPER3 =FX_MSIP_COATEDPAPER3
                }
            }
        } *% End of switch
    }
    *Option: Envelope
    {
        *PrintSchemaKeywordMap: "EnvelopePlain"
        *rcNameID: =FXPCL_MEDIA_ENVELOPE
        *switch: InputBin
        {
            *case: MPF
            {
                *Command: CmdSelect
                {
                    *Order: JOB_SETUP.4
                    *Cmd: =FX_APSP_OFF =FX_MSIP_ENVELOPE
                }
            }
            *default:
            {
                *Command: CmdSelect
                {
                    *Order: JOB_SETUP.4
                    *Cmd: =FX_APSP_ENVELOPE =FX_MSIP_ENVELOPE
                }
            }
        } *% End of switch
    }
}

*Feature: PaperSize
{
    *rcNameID: =PAPER_SIZE_DISPLAY

    *switch: Locale
    {
        *case: Japanese
        {
            *DefaultOption: A4
        }
        *default:
        {
            *DefaultOption: LETTER
        }
    } *% End of switch


    *Option: A4
    {
        *rcNameID: =RCID_DMPAPER_SYSTEM_NAME
        *PrintableArea: PAIR(9528, 13638)
        *PrintableOrigin: PAIR(196, 196)
        *Command: CmdSelect
        {
            *Order: PAGE_SETUP.3
            *Cmd: =ubyte =eA4Paper =attr_ubyte =MediaSize =BeginPage
        }
    }
    *Option: B5
    {
        *rcNameID: =RCID_DMPAPER_SYSTEM_NAME
        *PrintableArea: PAIR(8206, 11748)
        *PrintableOrigin: PAIR(196, 196)
        *Command: CmdSelect
        {
            *Order: PAGE_SETUP.3
            *Cmd: =ubyte =eJB5Paper =attr_ubyte =MediaSize =BeginPage
        }
    }
    *Option: A5
    {
        *rcNameID: =RCID_DMPAPER_SYSTEM_NAME
        *PrintableArea: PAIR(6600, 9528)
        *PrintableOrigin: PAIR(196, 196)
        *Command: CmdSelect
        {
            *Order: PAGE_SETUP.3
            *Cmd: =ubyte =eA5Paper =attr_ubyte =MediaSize =BeginPage
        }
    }
    *Option: ENV_C5
    {
        *rcNameID: =RCID_DMPAPER_SYSTEM_NAME
        *PrintableArea: PAIR(7260, 10426)
        *PrintableOrigin: PAIR(196, 196)
        *Command: CmdSelect
        {
            *Order: PAGE_SETUP.3
            *Cmd: =ubyte =eC5Envelope =attr_ubyte =MediaSize =BeginPage
        }
    }
    *Option: ENV_MONARCH
    {
        *rcNameID: =RCID_DMPAPER_SYSTEM_NAME
        *PrintableArea: PAIR(4258, 8608)
        *PrintableOrigin: PAIR(196, 196)
        *Command: CmdSelect
        {
            *Order: PAGE_SETUP.3
            *Cmd: =ubyte =eMonarchEnvelope =attr_ubyte =MediaSize =BeginPage
        }
    }
    *Option: ENV_10
    {
        *rcNameID: =RCID_DMPAPER_SYSTEM_NAME
        *PrintableArea: PAIR(4558, 11008)
        *PrintableOrigin: PAIR(196, 196)
        *Command: CmdSelect
        {
            *Order: PAGE_SETUP.3
            *Cmd: =ubyte =eCOM10Envelope =attr_ubyte =MediaSize =BeginPage
        }
    }
    *Option: ENV_DL
    {
        *rcNameID: =RCID_DMPAPER_SYSTEM_NAME
        *PrintableArea: PAIR(4804, 9808)
        *PrintableOrigin: PAIR(196, 292)
        *Command: CmdSelect
        {
            *Order: PAGE_SETUP.3
            *Cmd: =ubyte =eDLEnvelope =attr_ubyte =MediaSize =BeginPage
        }
    }
    *Option: LETTER
    {
        *rcNameID: 