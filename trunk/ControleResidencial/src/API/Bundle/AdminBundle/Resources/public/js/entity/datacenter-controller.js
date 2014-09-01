

                <style class="Toolbar.MessengerGlow.GDI" background="image(IM.Toast.Pawn.NMI.GDI.png)"/>
        </style>

        <style class="Toolbar.Wait"/>

        <style class="Toolbar.WaitFlipBook" width="89" height="89" NumImages="1" ImageName="image(bobsled.waitCursor.{0}.png)"/>
    </style>

    <!-- these are internally used styles - not really exposed in xml - use these for things like the scroll buttons inside the listbox control -->
    <style class="CheckListItem" fontstyle="FS1" VerticalTextAlignment="center" background="Transparent" padding="Rect(6,2,6,0)" width="850" enableAlphaEllipses="true" height="50">

        <style class="CheckListItem.Settings" fontstyle="FS2"/>
      
        <style class="CheckListItem.AtscChannels" fontStyle="FS1" foreground="@LightBlue" padding="Rect(6,-3,6,0)"/>

        <style class="CheckListItem.Folders" enableAlphaEllipses="true"/>

        <style class="CheckListItem.Privacy" width="550" height="150" multiLine="true" wordWrap="auto">

            <style class="CheckListItem.Privacy.Small" height="100"/>

        </style>

        <style class="CheckListItem.ChooseTuners" width="770" enableAlphaEllipses="true" allowMarqueeEffect="true" padding="Rect(6,4,6,0)"/>

    </style>

    <style class="RadioButtonListItem" background="Transparent" padding="Rect(6,0,6,0)" width="780" LabelStyle="RadioButtonListItemLabel"/>

    <style class="RadioButtonListItemLabel" background="Transparent" wordWrap="auto" fontstyle="FS1" foreground="@OffWhite" width="780" padding="Rect(0,6,0,0)"/>

    <style class="RadioButtonListItemDone" height="34" width="34" padding="Rect(0,0,5,0)" verticalAlignment="top" background="image(Audio.CopyCD.Done.png)"/>

    <style class="CheckListItemLabel" layoutPos="client" padding="Rect(6,6,0,0)" height="50" EnableAlphaEllipses="true" fontStyle="FS6"/>

    <style class="CheckBoxTextBoxListItem" background="Transparent" padding="Rect(6,6,6,0)" width="680" height="50" layout="horizontalflowlayout(false, left, top)"/>

    <style class="CheckBoxTextBoxListItemShared" height="50" verticalTextAlignment="center" margin="Rect(0,0,6,0)" EnableAlphaEllipses="true" foreground="@LightBlue" fontStyle="FS4"/>

    <style class="CheckBoxTextBoxListItemLabel" horizontalTextAlignment="center" verticalTextAlignment="center" height="50" EnableAlphaEllipses="true" fontStyle="FS6">
        </style>

    <style class="CheckBoxTextBoxListItemLabelLogo" height="29" verticalAlignment="center"/>

    <style class="CheckBoxTextBoxListPrevChannelLabel" horizontalTextAlignment="center" verticalTextAlignment="center" height="50" width="50" fontStyle="FS3"/>

    <style class="ScrollButton" width="27" layoutPos="right" nonNavigatingControl="true">

        <style class="ScrollButton.Left" background="image(Common.Scroll.Left.NoFocus.png,flippable)" focusBackground="image(Common.Scroll.Left.Focus.png,flippable)" pressedBackground="image(Common.Scroll.Left.Pressed.png,flippable)" disabledBackground="image(Common.Scroll.Left.Disabled.png,flippable)" padding="Rect(2,2,2,2)">
            <style class="ScrollButton.Left.EPG" background="image(Guide.Scroll.Left.NoFocus.png,flippable)" focusBackground="image(Guide.Scroll.Left.Focus.png,flippable)" pressedBackground="image(Guide.Scroll.Left.Pressed.png,flippable)" disabledBackground="image(Guide.Scroll.Left.Disabled.png,flippable)" navigateToAnimation="Quickfade" navigateAwayAnimation="Clock.Leave" navigateToBackAnimation="Fade.back" navigateAwayBackAnimation="Clock.Leave" padding="Rect(0,0,2,0)"/>
        </style>


        <style class="ScrollButton.Right" background="image(Common.Scroll.Right.NoFocus.png,flippable)" focusBackground="image(Common.Scroll.Right.Focus.png,flippable)" pressedBackground="image(Common.Scroll.Right.Pressed.png,flippable)" disabledBackground="image(Common.Scroll.Right.Disabled.png,flippable)" padding="Rect(2,2,2,2)">
            <style class="ScrollButton.Right.EPG" background="image(Guide.Scroll.Right.NoFocus.png,flippable)" focusBackground="image(Guide.Scroll.Right.Focus.png,flippable)" pressedBackground="image(Guide.Scroll.Right.Pressed.png,flippable)" disabledBackground="image(Guide.Scroll.Right.Disabled.png,flippable)" navigateToAnimation="Quickfade" navigateAwayAnimation="Clock.Leave" navigateToBackAnimation="Fade.back" navigateAwayBackAnimation="Clock.Leave" padding="Rect(2,0,0,0)"/>
        </style>

        <style class="ScrollButton.Up" background="image(Common.Scroll.Up.NoFocus.png)" focusBackground="image(Common.Scroll.Up.Focus.png)" pressedBackground="image(Common.Scroll.Up.Pressed.png)" disabledBackground="image(Common.Scroll.Up.Disabled.png)" padding="Rect(2,2,2,2)">
            <style class="ScrollButton.Up.EPG" background="image(Guide.Scroll.Up.NoFocus.png,flippable)" focusBackground="image(Guide.Scroll.Up.Focus.png,flippable)" pressedBackground="image(Guide.Scroll.Up.Pressed.png,flippable)" disabledBackground="image(Guide.Scroll.Up.Disabled.png,flippable)" navigateToAnimation="Quickfade" navigateAwayAnimation="Clock.Leave" navigateToBackAnimation="Fade.back" navigateAwayBackAnimation="Clock.Leave" padding="Rect(0,0,0,0)"/>
        </style>

        <style class="ScrollButton.Down" background="image(Common.Scroll.Down.NoFocus.png)" focusBackground="image(Common.Scroll.Down.Focus.png)" pressedBackground="image(Common.Scroll.Down.Pressed.png)" disabledBackground="image(Common.Scroll.Down.Disabled.png)" padding="Rect(2,2,2,2)">
            <style class="ScrollButton.Down.EPG" background="image(Guide.Scroll.Down.NoFocus.png,flippable)" focusBackground="image(Guide.Scroll.Down.Focus.png,flippable)" pressedBackground="image(Guide.Scroll.Down.Pressed.png,flippable)" disabledBackground="image(Guide.Scroll.Down.Disabled.png,flippable)" navigateToAnimation="Quickfade" navigateAwayAnimation="Clock.Leave" navigateToBackAnimation="Fade.back" navigateAwayBackAnimation="Clock.Leave" padding="Rect(0,0,0,0)"/>
        </style>
    </style>

    <style class="ScrollButtonText" foreground="@LightBlue" horizontalTextAlignment="right" margin="Rect(0,0,8,0)"/>

    <style class="DialogButton" background="image(Common.Button.Left.NoFocus.mi)" focusBackground="image(Common.Button.Left.Focus.mi)" focusOverlay="image(Common.Button.Left.FocusOverlay.mi)" highlightClass="Overlay.ButtonHighlight" foreground="@OffWhite" verticalTextAlignment="center" margin="Rect(9,0,0,0)" height="38" width="232" fontStyle="FS4" layoutPos="right">

        <style class="DialogButton.Button" padding="Rect(4,0,4,0)">
            <style class="DialogButton.Button.Modal"/>
            <style class="DialogButton.Button.NonModal"/>
            <style class="DialogButton.Button.Notify"/>
        </style>

        <style class="DialogButton.LastButton">
            <style class="DialogButton.LastButton.Modal" padding="Rect(4,0,20,0)"/>
            <style class="DialogButton.LastButton.NonModal" padding="Rect(4,0,37,0)"/>
        </style>
    </style>

    <style class="OutputPanel">

        <style class="OutputPanel.IM" background="transparent" margin="Rect(16,0,16,-16)"/>

        <style class="OutputPanel.FirstRun.TvSignal.Result.StaticList" foreground="@OffWhite" background="image(FirstRun.ScrollListBox.Wide.png)" activeBackground="image(FirstRun.ScrollListBox.Wide.png)" focusBackground="image(FirstRun.ScrollListBoxWideItem.Focus.png)" fontStyle="FS28" margin="Rect(10,-3,10,-3)" width="880">

            <style class="OutputPanel.FirstRun.TvSignal.Result.StaticList.1" height="35"/>
            
            <style class="OutputPanel.FirstRun.TvSignal.Result.StaticList.2" height="67"/>

            <style class="OutputPanel.FirstRun.TvSignal.Result.StaticList.7" height="233"/>
            
        </style>

        <style class="OutputPanel.FirstRun.TermsOfService" background="image(FirstRun.ScrollListBox.Wide.png)" activeBackground="image(FirstRun.ScrollListBox.Wide.png)" focusBackground="image(FirstRun.ScrollListBoxWideItem.Focus.png)" fontStyle="FS28" margin="Rect(10,10,10,10)" height="220" width="880"/>

        <style class="OutputPanel.FirstRun.TvSignal.PlayReady.ModeInformation" background="image(FirstRun.ScrollListBox.Wide.png)" activeBackground="image(FirstRun.ScrollListBox.Wide.png)" focusBackground="image(FirstRun.ScrollListBoxWideItem.Focus.png)" fontStyle="FS28" margin="Rect(10,10,10,10)" height="360" width="880"/>
            
        <style class="OutputPanel.FirstRun.UdcrInfo" background="image(FirstRun.ScrollListBox.Wide.png)" activeBackground="image(FirstRun.ScrollListBox.Wide.png)" focusBackground="image(FirstRun.ScrollListBoxWideItem.Focus.png)" margin="Rect(10,10,10,10)"/>

        <style class="OutputPanel.Extender" fontStyle="FS28" height="300" width="500"/>

    </style>

<style class="CandidateListPanel" visible="false" width="343" height="410" background="image(Candilist.Background.png)"/>

<style class="CandidateList" width="270" height="340" margin="Rect(15,10,0,0)">
    <style class="CandidateList.NumberPanel" margin="Rect(0,0,0,4)" height="54" width="50" visible="true"/>
    <style class="CandidateList.ItemPanel" margin="Rect(0,0,0,4)" height="54" enableAlphaEllipses="true" width="142" left="50" allowMarqueeEffect="true" visible="true"/>
    <style class="CandidateList.ListItem" height="54" width="192" dormantBackground="image(Common.Button.Left.Dormant.mi)" focusBackground="image(Common.Button.Left.Focus.mi)" background="image(Common.Button.Left.NoFocus.mi)" focusOverlay="image(Common.Button.Left.FocusOverlay.mi)" visible="true"/>
</style>

<style class="KeyboardDummyPanel" width="255" visible="true" layout="FillLayout()"/>

<style class="RowPanel">

    <style class="RowPanel.IMConsole" background="image(IM.Shadow.Box.png)" width="687"/>

    <style class="RowPanel.IMConversation" layout="HorizontalFlowLayout(false, left, center)"/>

    <style class="RowPanel.LoginPanelButtons" width="720" layout="HorizontalFlowLayout(false, center, center)"/>

    <style class="RowPanel.IMMenuBtns" layoutPos="top" layout="HorizontalFlowLayout(false, center, top)" padding="Rect(2,2,2,2)"/>

    <style class="RowPanel.IMLoginButtons" layoutPos="client" layout="horizontalflowlayout(true, left, top)"/>

    <style class="RowPanel.StorageOptions" layoutPos="client" height="140" layout="horizontalflowlayout(false, left, top)"/>

    <style class="RowPanel.ListMaker" layout="horizontalflowlayout(true, left, top)" padding="Rect(0, 12, 0, 10)" width="500" height="50"/>
    <style class="RowPanel.Radio" activateOnFocus="false" height="50">

        <style class="RowPanel.Radio.Edit" left="149" top="62" height="85" width="400"/>
        <style class="RowPanel.Radio.Seek" top="320" width="440"/>
    </style>

    <style class="RowPanel.CropAdjustment" layout="horizontalflowlayout(true,left,top)" top="472" width="580" margin="Rect(30,0,0,0)" flippable="false"/>

    <style class="RowPanel.Video.InfoBar" top="135" left="963" width="215" height="35" layout="horizontalflowlayout(true, right, top)">
        <style class="RowPanel.Video.InfoBar.4x3Zooming" left="853" width="340"/>
        <style class="RowPanel.Video.InfoBar.16x9" top="136" left="923" width="350"/>
    </style>

    <style class="RowPanel.Video.TeletextBar" top="5" left="110" height="60" width="1066" layout="horizontalflowlayout(true, right, top)"/>

    <style class="RowPanel.Options.BottomColumn" top="494" left="50" height="81" width="600">

        <style class="RowPanel.Options.BottomColumn.AddChannels" top="525" left="101" height="81" width="688"/>

    </style>

    <style class="RowPanel.FirstRun.DVBS" layout="HorizontalFlowLayout(false,left,center)"/>
    
</style>



<style class="SimpleGrid" layout="borderlayout">
    <style class="SimpleGrid.Radio">
        <style class="SimpleGrid.Radio.Presets" layoutPos="Client" top="287" left="2" height="153" width="510"/>
        <style class="SimpleGrid.Radio.Options" width="368" height="530" wrapAround="true"/>
    </style>

    <style class="SimpleGrid.GuideBar.Buttons" layoutPos="Client" top="87" left="306" height="150" width="680">
        <style class="SimpleGrid.GuideBar.Buttons.16x9" left="426"/>
    </style>

    <style class="SimpleGrid.Options.Home" navigateToAnimation="Left.Enter" navigateAwayAnimation="CommonRight.Leave" navigateToBackAnimation="CommonRight.EnterBack" navigateAwayBackAnimation="Left.LeaveBack" width="800" wrapAround="true"/>

</style>

<style class="SimpleGridRow" layoutPos="top">
    <style class="SimpleGridRow.Radio" height="50">
        <style class="SimpleGridRow.Radio.Presets" layout="borderlayout"/>
        <style class="SimpleGridRow.Radio.Settings" padding="Rect(0,0,0,4)" width="368"/>
    </style>

    <style class="SimpleGridRow.GuideBar" height="50" width="680" layout="gridlayout(1,3)"/>

    <style class="SimpleGridRow.Options.Home" padding="Rect(0, 0, 0, 50)" height="200" layout="borderLayout"/>

</style>

<style class="ListMakerProgressBar">
    <style class="ListMakerProgressBar.Status" layout="borderlayout"/>
    <style class="ListMakerProgressBar.NoStatus" layout="borderlayout" background="image(Listmaker.Overlay.NoStatus.mi)"/>
</style>
</styles>
<?xml version="1.0" encoding="UTF-8"?>
<styles><constant name="OffWhite" value="RGB(210,210,210)"/><constant name="OffWhite10Percent" value="ARGB(26,210,210,210)"/><constant name="OffWhite46Percent" value="ARGB(117,210,210,210)"/><constant name="LightBlue" value="RGB(104,185,200)"/><constant name="LightBlue25Percent" value="ARGB(64,180,180,180)"/><constant name="LightBlue40Percent" value="ARGB(102,180,180,180)"/><constant name="LightBlue80Percent" value="ARGB(204,104,185,200)"/><constant name="DarkBlue" value="RGB(30,42,108)"/><constant name="MediumBlue" value="RGB(0,161,245)"/><constant name="Grey30Percent" value="RGB(180,180,180)"/><constant name="Grey25Percent" value="RGB(205,205,205)"/><constant name="DarkGreen" value="RGB(4,106,61)"/><constant name="SkinPrefix" value="TV."/><fontstyles><font styleName="FS1" fontFace="@MainFontFace" fontSize="22" fontWeight="Normal"/><font styleName="FS2" fontFace="@MainFontFace" fontSize="22" fontWeight="Normal"/><font styleName="FS5" fontFace="@MainFontFace" fontSize="24" fontWeight="Normal"/><font styleName="FS6" fontFace="@MainFontFace" fontSize="24" fontWeight="Normal"/><font styleName="FS7" fontFace="@MainNonBoldedFontFace" fontSize="26" fontWeight="Normal"/><font styleName="FS8" fontFace="@MainFontFace" fontSize="26" fontWeight="Normal"/><font styleName="FS19" fontFace="@MainFontFace" fontSize="95" fontWeight="Normal" characterSpacing="-12"/><font styleName="FS23" fontFace="@MainFontFace" fontSize="309" fontWeight="Normal" characterSpacing="-25"/><font styleName="FS32" fontFace="@MainNonBoldedFontFace" fontSize="150" fontWeight="Normal" characterSpacing="-10"/><font styleName="FS40" fontFace="@MainFontFace" fontSize="22" fontWeight="Normal,Italic"/><font styleName="FS44" fontFace="@MainFontFace" fontSize="130" fontWeight="Normal" characterSpacing="-9"/></fontstyles><style class="ListItem.Audio"><style class="ListItem.Audio.SongLength" focusForeground="@Grey25Percent"/><style class="ListItem.Audio.SongTitle" activeforeground="@Grey30Percent" focusForeground="@Grey25Percent"/></style><style class="GridCell"><style class="GridCell.EpgBodyText" focusForeground="@Grey25Percent" activeForeground="@Grey30Percent"/><style class="GridCell.EpgBodyTextFiltered" focusForeground="@OffWhite"/></style><style class="Panel.Video.Epg"><style class="Panel.Video.Epg.ProgramDescription" width="627" height="80" left="50" top="39" wordWrap="auto" fontStyle="FS3"><style class="Panel.Video.Epg.ProgramDescription.Ellipses" height="80" enableAlphaEllipses="true"/></style><style class="Panel.Video.Epg.ChannelName" margin="Rect(0,12,8,0)"/><style class="Panel.Video.Epg.ChannelNumber" margin="Rect(11,11,0,0)"/></style><style class="MenuRadioButton.Menu"><style class="MenuRadioButton.Menu.SmallFont" optionTextStyle="MenuRadioButton.Text.Small"/></style><style class="MenuRadioButton.Text"><style class="MenuRadioButton.Text.Small" fontStyle="FS4"/></style><style class="Button.List.Video"><style class="Button.List.Video.StoppedOverlay" width="281"/></style><style class="Panel.BlueText.GalleryLabel" fontStyle="FS4" height="38"/><style class="Panel.FirstRun.Text" fontStyle="FS11"/><style class="Panel.FirstRun.Title" fontStyle="FS2"/><style class="Edit.EditCaret" top="-3" width="30" height="8"/><style class="Clock.Date.Video.Home" left="-10"><style class="Clock.Date.Video.Home.16x9" left="140"/></style><style class="Clock.Time.Home" width="180" fontStyle="FS2"/><style class="StartMenu.Item" foreground="ARGB(255, 32, 100, 160)"/><style class="StartMenu.Menu" width="344"/><style class="StartMenu.MenuContainer" padding="Rect(202,0,32,0)"/><style class="Panel.Option.Checkbox" height="" wordWrap="auto"/><style class="Panel.Audio.NowPlayingInset.TrackNumber" left="30"/><style class="Panel.Audio.SongInfoBar.Root" background="image(Overlays.Outline.Transparent.png)"/><style class="Panel.DialogText" foreground="@LightBlue"/><style class="Button.List.Audio.Simple" margin="Rect(16,2,0,3)"/><style class="RadioButtonListItemLabel" width="800"/></styles>
PADPADDINGXXPADDINGPADDINGXXPADDINGPADDINGXXPADDINGPADDINGX                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                DCNPA30���ޱ��n   U� `"�3F��ap>!�k�!�`�@�6�fB�؀AaI�
�d:��X�G�h����#��.1�
�s8��W)P�0 r�|�����O#�P�ɠ��7�[A@�X��aB��B`�>RC���.h"�����8V�n��H]�6������l3K��=���\D�ǯm�f�@��jXp	cB��#<�q�L���T�Zų3��*�(���B̜���E8�PF9�(��r�SF9���
�N9�)G8�S�p�)�ᔣ�rDPA9���2��r�)G8�S�0�PF�(��2�SF9���r�N9�#�r*�@8�S�p�)��TPA9"PN���r�A9�T �r�)G���SN"(��r�SN���r�#�r*(G8�(�` �$1!%�`�
�$�qq,�9R^D1I��#X�N����a���֔�ؙ��X�"&��"�b�b���$
d��bP`q	%v	�� |0�� �|0��5 �Q���p C��h&����Ͽ�ws�ۺv:>��~�9>��yD�)���D��)R$˥[�\�ɒ�H'R�H1�������tnst�c�����v��Ƿ�o�ξ����:>>~v>ݶ���C��6P S8= H�� �I�"E��Ho���������>.���/��:=��"q��� �$�	���wzB-��M�.Z��i��U���W�Ӫz�+��E��)��h3��ŋ6gt��Y2�;���yƛQ��<���������z9�<YE��*V�Y4Y�bUc��=��+沲��h�3�jU���*i��Y�b/ZG�A����7$ ���'���Hh�4���3�*p�+��Y��)Z��7E(���6K�8E�N�)C���Q�Fr�����dqx���
,^8�*�q�n 0|` ��b �P�		@}xU��yL��ޢޗ��[mg�*����Po��w5W��(������UԽ��P���"uZ.�<_�U-t}�U�~�$?��Z�j_��zUѝ�zݽ苺��H���d���˂�I*�ˋN�
y,&�RH,`��ae�d� ��H��n��8�-*��4|�*i_�%�*�Y�ؾUe)�Ug��h�0�oñ�Kne�]0˥�8G$�Lp��9&ư��RP!z�THF�	v����1�H,��X;e@ Lң04<��$m��x3������0��F�<*\:.��="R��������&;="��z�oE�X�)҉9�S&�E�d�ezEze�E<A\$�EzE:�R� �\H>0����߹�A#du>I&��"�dED	'/_.��󖝂��iI�gF|�5X�S��)���ˉUn+��/߯�R�W�`U�⬫R0wZ��9���5�󳦕ū�yV�uU�����u��e�O��ɛ��FcRл₣'$�QI�0
��4� HJƙ�3񢜢�+4b�X�(B�P���(3�Jʙ����IvA� � ����@��@(���^�/"�}a_�U�c��Y`�z�<Ծ��׫A�Jm��F)J�(E��E��MQE	�R�Q�G�����(0��m�6u(�����(J	�6���fMQʨt{��*�4�W�)�6����>)ҋ�}d��J�����N�D��&��Kވ9���}.Q��'8��rM���&�R4e|.���L�L���po���N�Y�R$�h.e�R�]���+�+l�^� ,���<9����{�`ҋ$0*A�	�g��&"G"`F x ��@�����`\��
�%��
�w�<�] h^��
R�{U�T��J�^�^,.Ӌ�W�W�W�W���W��q\���TI0�NerO�*U�a*=������\�t*'�W2}�O�����N��^��,��q�Q�cq�����~h�L�a���o�<a�ȅ}�F���"nD�������������۷�ZQ�����>��������66�ͱ��|��A
A�E(���xΒ�H�B
�����!�q�2���%����$v�2.���}�Ge�/G(�R�D(3R���LH&e\8nQ&��R��2q&�m&΋~��������GEvƩ��)��	ޔ3�aLƤN��c�b�"=�q'�� �`�@$�H�!��H���Q��F���F"0���>��$�%�p������C �h8/?�^�� 4��
p���z�@��@��X'��V�U*�Rgb�ǆ%�ġH���W�}B�Oj<=O���3u��]�X:9��N��Rg2���I<=�;NŒ����S���3Q�H�ą�;�$���q��N�xz�N��Lo��[z�ޥ;K�\�t!N�$�3�	L�A���d�2@u�p����>����6?@Zn�}Ds�ϑs_ؾo�7����>`}��|����s���i#�6k�"���x�"�)��8A��(�2.���e�1قr'p)P&�h.P�[4o�;ќ���p��K�(�x�PK'�a�	�E���`E��YQނ��\�`Ey����3��P�Brv�Sނ�r&E�#�c��!�x_���M�D����p~*���#�	��%��}8vL�c�<$�ߢ�H�@$�!hC�FҐF)�0��6� �)C�2�(E��3�"��>�}9o8�}
9��Gx�w��{���<F��?��,¡���8,<�
=��/ ��ȷ�E�xU�
U�"^�z�+R�U/)��X�"U1�^���ZE�����z�
�f@��7�Y��m����}aN��K�޾����������+<��a�ʪ��Wu7=r������¾7�֬.�wQ���&_ש{�w�]��O��Od�p.&��2H�w�uq��?�jd�EU'mެ^�����ag'���^�\֫���8& f����4��9Ǿ�g�LEf���7�LF&+�Ұ��5K��t��{+M/��	���F���K?K�d$K��h�HLd(�@z��¡^�^� �W��/�U/��MiP�s��W�ĔO�H���)�:S9<}�ʥr�rI\�"�	L��RS��)���\��J��8��L�i�a��Q���a�e�I\�T�>w5�|��HUB+��$�rW��Ug�E�j�2U��s���N徫��|�_j9w�:S�k�sE�+���LVdO��	0�y�&Mf%0w�$�n�0$}&�Y	���� �$��$p�(��������F� �P�ځ�T��t*�*}�Y���J�JoH�ҋ=}Xz�ޥw*}[���7����M�o��J��G.}b�K/����w{z�ޑ���X��$�Ğ�=���DP���U�D�/�r�&�	�D��}a@�y �� ߠ)�5�7�GY����T�6����_pA�Na��"FA���/����x��#��L�1^c�*�+��J���YRŊW��U�q�£U�vf�^�C�o�O�M�^�
� `�0P��U�](84� I
�.Z �� �P�����s���QF�P�"p�<WuQSN��W}Յ_�USW�Z�
�R����>9�
_��W�+�vw�l_P_pAMWAa��.���S����uP��Ɣ���]�1��r�_�r�?�{����WW_^߮"sA�8@�0�@0�0
�Q��:���9�>!hCІ�0$��hC�F�(
5GIJ���P�P�QP��5����*s.S�o�|���ޥwO�Zz�N����N�O��a*}S��|:�\>s��rI\��G�"RݍLb�L�%A���Nb*}SO�g,=EzB�����/tzB����	�8(=�0�	��y �ۑ���ȍ��-���f��E�
5r���<��aa5�*6rai�A������/�0�V�¾���s�L���,r�q��I<���O�
KqQ��&��x�	�G��x�rLF��I��a-�A��NG��mnH�0.#�r���ʸ�:P.�8e���EE(�\b8���?2񻪌&�x��I`5  &��	����� ��`|��P�ZU �@�|W���[(�U��8��ҫ�}R�O��I�>�:=R�$8>G
�U_�K�H�)Gr�O��IE�I�U��kRb�\�Z/	���L_u��)qE�+w'��gW�
jQTDuWTPWu�	�@	` �� �p�����
�
�(Y|(�3�Y|aPl� �n^-�*3��W-��TL]A�Q�7T�_1�z_]��WW]!���|�����y��#S}S�)������?���x������"ԫޑ�{^�:U��*�W$�MuuU�(C�@�Qw�0ikq��H�(m=��4���q$@�#��#h(q�(`E��(�(�(th���	�
��P �1P��P@��@��χ��>R��TK��E�4�T�ӳ�$Fz^�̏�x�ө-��/t�X��'����DXHϞ��$ľ=={>�m���)R��Kߗ�;�Q����/t�a�,w�u����`�O�Ʉ�� I��	B� I�� p �
v0
(Yl�k(�����P�f�M0!�4�YN����TW�c7��W}�Py�
���Q�Ua� ��7u\���<%K�r%��^��z�:~��{�w�U�u\��,�_���XV)�B�
8٘jI6ve^���
o�]��p*bH��B)�B�"�*뫫��wW��T$np�D��2��y�	
A�J��B`iz4��i�(�@Iz�N;BOIh�Ʃ;��J�@]���P�(tp�8�#�q�:l6$���a�ȅ�-1�ÔW><�=��Q_H�rsWWSD�c����R��S���w|���W�������n��牸T�7�7_��x�\h�|a�羥
��ĕ��<y�`�p��k�"0�w֞9w8�.=�S��U�������顧��h���.$����(pH�&pQ����h� �w��@��&zG{
p}�����-����/�0���E6r�e#�����پ��~�ط�0ra�����F���U�|E�n�eܥ�y3)$E���GO*dzx�$�y�\�<R&�I�Z�();%�RHщ�)SЖ.E2.3e�eҥLF�t")��1ʥ�̢L&1*y'�0�B�Dx˔쨐�2�f��8*$�"��e�Cg��S&!_2e��Jo�wI�>@�0a�t�/� ?�%p����H����O�nL���+@�@A��T	d:u�^�^<���O���+�+�}O�T���*}<�"�S�Q��ңҫҋ�W�K/�^L�O�w�]\ƇG+�RE���Ā L�� `�A�����i�A
��4���P�@I��q��ʇ)_��0���RW�*�WAa�]]�꫾����T�U_W����|Õo�<�1�+\����sL�np�Q�S�K��/�V��[9�⾠<�W}�/�{)_X_��H�_L�����r�7����Q��ԁ�8L�>ҧ(E5
9z��N!����B(4�4��h�&�:P����B�B�BA������"�"�B�( j(�i񡀖����ۼ��by"={B���}ʻX~͌g��G��\�M�aDfPD�\��eF�}*3�?�c#r��������72��$GfF2d����$B��B&|0�|�*W����n#e��m)��HV�$(�B1M&^8}������1���&ph&4�i\4AM�$��8�`�6�9 
(�4�0(�L�F��H�'J�]��Py����2("�HUF��<��H�2�H�zG��WDV n�XW n�o&�.M �QEv��y����U��yU蒯w��X��9*�z�ΐs��3�Ǆ*�*�"*�{�w(��#��Y[U�;�u��6𶛤h&Mh�I�4i:J$�(��@;A�>c��i�.� K`v�E��၍����WEr����>�;�؀��c.����w 
����u�B���r��-����U�o�O��W�>��J/G�W<}��H�:�hzizizizizYzizyz�L��#C[���*�2������(���`
D�P��Q�iot�FA`a�ۨw�}a��<������}���}����}����>�}5"��¢ۉEF��(���u�����^/�
xC�.0Aј�d�E��N6���y#�eC��/��B��r�)*��"򒤨�����*d�.$� �_��(�-�i�N�� �Lq���2XFE��Q�I˩��살�Ŋ��
&��\Ʃ�2_B^v�-dS�1AJR��x ��N@? o����\�Wݐ#	��Nf�L.�LB�N��$dgʔ);���H�)d�L�I.S�Ȕ.AT&@)S&�J�ǿ�k�؄�B�B>�(E �2�h�C/�I�k��e�Q�Q��
F�9ʨ��QN{M�qʸ��vJ�J')kA[t5]�2
'�r*$]s
�I�m���)yV!ĥ9�H?���:�g��'+E π"�^�B�!�sGryNE���A��M�f�"�N�CI��������hA�F�8rN��G",pw��Gi�Ey��q��8�I�??�<Ρ᠅�X�'��NC���=�X��JQFQ�PJ��Q�P�(mKJ�^�:FeM9s�Qǚ2ʚrƙ�2e�9�	֜q*��3�8����2�)s�3�3�8�QF�5mFQF}�����޾��|���� �Ť�|M��K�2=��s)�CKp!��(�ǅ�[�fwٙG�e:c%��l�'A��LG�2E�`��2��"%��̤���Ha�R�l��(�#+��!U�y�bNq�2yj�h.�-���Oc2T�N��w�d���_��PfF"0E)� p I@?���D���m� ��X�b�b�����
D��"��"��W�XU�c/_�r/G�)�UU�"�� l1�A@E!)�x�>�}��X���L�}Z&�a�EjZ&�Nߗ�o�}_��#�Xz�0�D���x��8�.Xby�X��Y'��K�N,�a4=���P�2�ʑ���PdMr�~�����T'�CkR`��~@?Ё�ʷ1�mX+�(p
�E�Z}qG��UX�"W�od��s`�<�9�9
��2��޷ݷ��xãb��	��m���;�2�8���4�H-}��������Դ<A�>v)"�O���<V��Ύ���=��%a�,�~����q�(.I�a�N��J���~@%8t9Sԋ�}����������+6�}��{��EjE|j�����(pT�)�2]\�_�G�Q��"R�ݢ��]�E\D'��,:��+z_��Hu� *}K�����J��=��2=%�=��=5����C]�$<㝊d% ����CH��C���"���Z�yVna'V�9
�����7 g�����5���,��(���T������*�b�]%�*��w[|�-��_t�*2��N�E��/b���*���zCU�Ы2�£ӱ������X���WPIT���)�>o^�G����S �j��x�-��.�/T���w_d�΢�����5����P�E��q($K�.�\%���n��-�����.��o���SS�[�-�wlO��Yl�TdW�axo1��մ��3 ��P��D����b�y��7raa�������3���G}���澯^�������<�+Op��g�b��t�.�\�5q"V�J�+.�)�MSE�x��U�x\��U*VPT��P��נPP��T�hz+^��Z�j�REz��X�XU���S5 �������7��Q�}a�/�I�}��oa�"�UEF�m߾��]-6T�����t{�r���b�V�烦�����o��u#6�C�G(;���\��xBa.�#�6N_1{<R5�-����bѪh��UEa�'�)����W�c�L��U�X��U�XI��c�E4E4y���c� @4�"�|������y¶m�6�۷"���m�Yt;�\Ŀ�6r��o����g����}����z���vb��m>���y�m;�p�A{��X�F	E�����><���ǡ2�d�A�c�2��8N�K�\F�$�d�Eʒx����9)��Lq��p]F��D.\�y̔�\���"*�%J��$��Iq�Q\�K�rI/�a�8��uI�ER����\I�CLL�]�$�m�[�^�ja_md}_�&�O�}�&7)��y����ܶm߀���}b;w��91r��.�.�݅:p�p���jĉ���;�*���E9�ȩb������ʀo�E(<=Ə�~U���i�K�U<�O~��.�?�� ���Xಎ5���CD3\bG��v�J!�vG.��2/'�҈��L�G��T�G�&��H�a���0#F�H&��`O�1R���<�   �`(�s�������jA�[����-S蔩���:K�%��Z�:u&�^�ZN簉���N��D�oZLN�ۜ��k˰�݁,�c�Y�`0F�rJ�|��]��cP��Y����ұ��$E9Ɋ2q�(C)0Z��Ø`�cVer�`��⌋�7Ð�%�t拷�'�\I�� �q6�Ũ8���Ê�槲�e���d���*CٗUeg�g����;�c�����\�.�ċ�\a��x0P tp� �D8��R��a��~@!�����֘ ���n�C��]zD� �K^V��}�ګ,��/c��,*��14�U�(}��u���R��G��2T\��Z\�і�UΦۻ�t�UH��՗�+j/��{��9�B�|A���;�+���}�rG�x��;~.�>� 9pG��d�(r�� �pN�Zִg�8㌳�i�挠�K9#8m֜6#(�p�o��9�p֜Q��1��Q��)kʚ2�6s�9�(��)�s�8��i3G�5eM�qڬ)��)mΚ2�(�R�8�QN9���e�򦌠͐FAAq{yǴN����O�RF �r-�3������t�r��k��q&)z���3�D:�ڰL�J'��z���J'B�����!�	�X�t����@DgJ�@.39C �)R7D�L�(D�LAr���|J�>IIy�,=2Ź������Z\�.�H~��g�,2� � 4!�)��1�*�Q����:�^��5Op�k����VmUް����*����j�r��Q
��}(�o,�`R>���;�Ǟ��m�N<=����w��W���}�;O�E���Tw���|�I�S'Q�XpO���ޒ���X$,*	K�Ǝ�QΞx�<=����҃�O�R��'�!��쵭�]`��\۷��b����G|��ķ/,�}������綏�\p���}���b���}�F�۷��ž0�?_}��G�۪�}a�ȑ[d���7�o�@H��7l�o ���|�>;��⻐-�����qʞ%#|Fp��\����L
�*ɄU��5�.B���	&�24,�e�h.��DK�=����s�P����r�B
)���2A��S.ؒq�E�)��|S.s�f鐜2�ⲡ �%�#��+Κ>e�H�o`
A @����G�4��? �|=�	`�NjMc�q��/`�����Z���^�ډW�\ą[�#i��
�+ྪV��rc���A��7�\�b �;�v�mL[g)h`�KٚabR4e��w0D^�;�K,���z\\<=�4�s+v�d��;O��5*3���)�=��dbK7��%v���Hb�!��c0bY�+�s։	�~.s#O)6xO�r���lyb-:�n���dd��Dz�1D<=HEv*i:~�,1&�0��|�B WB`H���r�!�cp� ܐ8�?�C�B��w
�n��9r׵����hU|s[��]۶y.F�5��N�M
��1�҇�t�%&���X'֩e
���R8)�ON�y��j5�"��z!��0r�`�-�m�o��&�hRN���fma�/s����C��*89����I���/�f�u��X��SdQO�Ɨ!��gLb��%�N����`���%�^����c�����=�1�h]�)?;F���
����w*h��5�ؗc2�/�
2C8��a�/���u�F+���!�D��tKC�(z���|>��Pa�[��#�?����E��p檪��^�8�*�b�����.��(�3�3W�8s�5ge>NQ�G���ܫ��h�
uGQ�E��tEW̷�m�/b�
TH�^�a��H,%��ұ[
�����1����$����M��J�+"I,��,�Ć�=�-�IV��<H����A\�)����W
L�2)3�w���c"�]��*Q�̬
X&�$E�$K)23)R�ܮӕ(�'���č0������i
����~��� p&a(��� C9z8�:
��TU�6U]c��P��ms���vb�m���m��na�',l�=й��ZX؈����H��ޡ�y��g^A�Y�X�(��};���{�A&����'pI���}l�Z�����}_���m���H߅Nϗ����%~|������K�ƒ�?,	s-3cXz*�=��=�EzJ�{^,=;KO��c��S�wH�����ѣ$�}��m\|BnRd^^�[���]ȯ��d���BM~2��w�R
�-���o�jr��B�M��Şb)��O|9���R,l�rۂ�����s��K�J����m߶�2���]� �V$[�
dڳ3!a˨d�Lr���D�����"��P��?�%)�����j�$k^V��L���N�Jٗ���҉s�����uθ�,9e��K2ތ��q���fr�8R��B�'���/��/�`⹳z/�(����.E�f��4�i)��/-E:�,I9�` �n�A`�#�8��0r����@�t� C��A�� ��X>?�,�MQj�P/�u�R�:Z(�(������i�A=���Ӷ�65M���jh[G�m�E�����+�� �G��45-CѦhS�m<e)J�(�h?5e�N40�D�a�8ָ���W8;�qL
�c�q���I!X�J��V�*�|��<\��Zs��<ۜr\lʝ	��&U'N��*%�l\�-�5�I*��ƧűV��Bb��Ʊ�1\�c�RUq�����+\X��v�
oL�s�w�/puu~�;W��g�"�s�U���S�c��Cqՙ��[��aLAk辀B�BL�"G)����B��)z��o�h�N��N�Yzi�1zꎜ���S��)E�&=%i��}�N��Fh��q�P�pR�(	r�!�|��ν �����ʽ�/�������^ 7�Y�X�ہ��)�n�?���[yĵ�ǱO�YW�L=	5�dSϧ���3L�ta��2S�aS�cS�cx�ܱ������pE�W9��*��1��pE�ɫm=9E�K\���=��H���|�������K��(��*�!�R�R�ZP���-� Da��#�����L�Ι<\+��;M��@^�G�����������&p+�:p�v%HThE�!4}u��H�O���/�V��E6VQ6r;#W��l_𳹍t[`[ts�l.�#w>V�g�Gn��#[}�l_�GǾo{}�EV��sw��[��[���ɓ"���v�N����\$".�?E�E�$�H��yqǸ���EzJ$!��{��������&�cC�y4	�GӉ�t�b�)2���D��ܭ�#�Y�|)���	�w����U��<="$��ާ�"S$��'�3�'�!�p �����T&$!y{{��t�H%�B`�$�����0>|8���W�ŉX ���V�>�V�^ ��}�8�E���P�|/(�����$F�a�Ǝ�K=L`J+�c���l�|R9RM+���w�[9��"�:ָj�0���1ELb��9�7V�UklX����1�c����1���
wZNbx��&S��Ԫ�%~������VX��
o�X��J^��>L�e+��T_u���ԇ����,��0
.HC�E�(����mNa���)���;JRN�i��C��>%Qޔ#O~����O�yS�	�����@��3�u`1�1zؙ;�I��h�3��􌲳������i��9z��(#�i�{@�� 
ȃ���� N�Ab(�ma�}���i-����r��YXPKߖޥ7d$�2��ԓ�Ԓ��t�)�w�R%�uf���*�.lIT-��>�$�zA-���SSI���N�x�]X�uN��>�K�A%�B:�*,d��\�
�QA%A�$H��/��j��߱ܙp:�|.a�\�*!���e�t���ʬ$�{�t�'�;� �$� 	�H"	�H��=a"HHP�G�b�E��Ԡؠ�"�����Zta_��b��~P�-� XsSUFpa����\�9v<��UD
��ܫ�#�"��,�W�.�WU�M��ЙU=��sS�^����ju���;%�M9�_�83%��.q%xpxK���T������Uʗ���y�*�2%��SO%���pL�`>\�+� e*L������;d�<� HdG��EP��(EСn�P��1�2z��P��N���Pw���(;=K�ޱ�G�%Y�;k�Fe}�#YG(#YG�)s���k���#쌤�,��S��Ǣ(��&	���Ç k��P��P���(\u*WD��U����V.�z�ΜJ6��#�\�S�M-�)"l*�6�"��r�ߔ˫��T��;�|��7L���o/�ʧk#2Ky2�D�y������\�OuP!U�
�9�t�B��zg�	z��2$�"*	�v�de����uغt&�:�38 'He�mݦC 	0!�E�l�r@Gh��}�W�ix��A7�VĠ؇���>���v`���4�����U�g���Uz�ު�Uz��{��LOU���U�|�NO�NO�T�+=���a�ąɐU�<=�$a�W��I�ɤ	��d>�OO�$�W%��*	�UO��[��J��JB���>�O��N`��|(A �(���~P�a>|�x�qə�9�L0��O�&�jL�9�_Ud������5����8K��̫L(�n_��qƛ	Κ3�Kނ�R��g�g9&��w�y��nbg��3Ǜ���-�x��='Xs7Κ�w�	v.6�R�	
(k�(GD��͚��� �D��(���r�;ʛQ~�)�u�)�)Je(�hs�(�HSmH�f�QH���Ȋ6b��`(r�8e���3��5e���h#��7
yyP�i󦍼�S��r�YC^�S�!�>����M��M�;�g}�q'b>��`�q0��C� q�Q�"(iڼ)�G�9�(mFe�ҳSF