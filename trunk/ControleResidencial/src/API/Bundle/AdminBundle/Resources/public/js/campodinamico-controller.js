/**
 * @author diogenes
 */

	function messages_proxy() {
		
	}
/**
 * Retorna os cabe�alhos das mensagens a serem desenhadas na caixa de email.
 */
	messages_proxy.prototype.messages_list = function(folder,msg_range_begin,emails_per_page,sort_box_type,search_box_type,sort_box_reverse,preview_msg_subject,preview_msg_tip,call_back) {
		if(this.is_local_folder(folder)) {
			var real_folder = folder.substr(6);		
			var msgs = expresso_local_messages.get_local_range_msgs(real_folder,msg_range_begin,preferences.max_email_per_page,sort_box_type,sort_box_reverse,search_box_type,preferences.preview_msg_subject,preferences.preview_msg_tip);
			if(call_back) 
				call_back(msgs);
			else{
				call_back = function(data)
				{
					alternate_border(0); 
					draw_box(data, get_current_folder());
				} 
				call_back(msgs);
			}
			draw_tree_local_folders();
		}else {
			$.ajax({
				url: "controller.php?" + $.param( {action: "$this.imap_functions.get_range_msgs3", 
								    folder: folder, 
								    msg_range_begin: msg_range_begin, 
								    msg_range_end: emails_per_page, 
								    sort_box_type: sort_box_type, 
								    search_box_type: search_box_type, 
								    sort_box_reverse: sort_box_reverse } ),

			      success: function( data ){
				    data = connector.unserialize(data);
				    
				    if( data )
						call_back( data );
			      },
				  beforeSend: function( jqXHR, settings ){
				  	connector.showProgressBar();
				  },
				  complete: function( jqXHR, settings ){
				  	connector.hideProgressBar();
				  }
			  
			});
		}
	}

	messages_proxy.prototype.get_msg = function(msg_number,msg_folder,set_flag,call_back) {
		if(this.is_local_folder(msg_folder)) {
			if(set_flag)
				expresso_local_messages.set_messages_flag(msg_number,"seen");
			var data = expresso_local_messages.get_local_mail(msg_number);	

			eval("call_back(data)");
		}else{
		    $.ajax({
			      url: 'controller.php?' + $.param( {action: '$this.imap_functions.get_info_msg',
								  msg_number: msg_number, 
								  msg_folder: msg_folder
								  } ),
			      success: function( data ){
				  data = connector.unserialize( data );
				  
				  if( data )
				      call_back( data );
			      },
				  beforeSend: function( jqXHR, settings ){
				  	connector.showProgressBar();
				  },
				  complete: function( jqXHR, settings ){
				  	connector.hideProgressBar();
				  }

		    });
		}

	}
	
	messages_proxy.prototype.delete_msgs = function(folder, msgs_number, border_ID) {

		if (folder == 'null')
			folder = get_current_folder();
		if (msgs_number == 'selected')
			msgs_number = get_selected_messages();
		
		if(currentTab != 0 && currentTab.indexOf("search_")  >= 0){
			var content_search = document.getElementById('content_id_'+currentTab);
			action_msg_selected_from_search(content_search.id, 'delete');
			refresh();
			//draw_tree_folders();
			//update_local_box(); 
			return;
		}
			
		if (!this.is_local_folder(folder)){
			delete_msgs(folder, msgs_number, border_ID);
		}else {
			if((folder != 'local_Trash') && (expresso_local_messages.as_trash())){
				expresso_local_messages.move_messages('Trash', msgs_number);
				this.aux_interface_remove_mails(msgs_number, 'local_Trash', border_ID);
				draw_tree_local_folders();
				update_local_box(); 
				refresh(); 
			}else{
			expresso_local_messages.delete_msgs(msgs_number, border_ID);
			draw_tree_local_folders();
				update_local_box(); 
				refresh();
			}
		}
	}
	
	messages_proxy.prototype.link_anexo = function (info_msg,numero_ordem_anexo) {

		if(info_msg.local_message==true) {
			return "javascript:download_local_attachment('"+
					expresso_local_messages.get_url_anexo(info_msg.msg_number,info_msg.attachments[numero_ordem_anexo].pid)+
					"')";
		}
		else {
			return "javascript:download_attachments('"+Base64.encode(info_msg.msg_folder)+"','"+info_msg.msg_number+"',"+numero_ordem_anexo+",'"+info_msg.attachments[numero_ordem_anexo].pid+"','"+info_msg.attachments[numero_ordem_anexo].encoding+"','"+info_msg.attachments[numero_ordem_anexo].name+"')";
		}
	}

	messages_proxy.prototype.proxy_source_msg = function (id_msg,folder) {
		if(!this.is_local_folder(folder)) {
			source_msg(id_msg,folder);
		}
		else {
			var num_msg = id_msg.substr(0,(id_msg.length - 2));
			expresso_local_messages.get_source_msg(num_msg);
		}
	}
	
	messages_proxy.prototype.proxy_set_messages_flag = function (flag,msg_number){
		if(this.is_local_folder(get_current_folder())) {
			expresso_local_messages.set_messages_flag(msg_number,flag);
		}
		else {
			set_messages_flag(flag,msg_number);
				// Verifica se a pasta que esta selecionada contem a op��o "N�o lidas" ativada
				// caso exista, ele chama novamente a op��o "N�o lidas" para atualizar a pasta.
				if('UNSEEN' == search_box_type)
					return sort_box('UNSEEN','SORTARRIVAL');
		}
	}
	
	messages_proxy.prototype.proxy_set_message_flag = function (msg_number,flag,func_after_flag_change){
		var msg_number_folder = Element("new_input_folder_"+msg_number+"_r"); //Mensagens respondidas/encaminhadas
		if(!msg_number_folder)
			var msg_number_folder = Element("input_folder_"+msg_number+"_r"); //Mensagens abertas
		var folder = msg_number_folder ?  msg_number_folder.value : get_current_folder();
		if(this.is_local_folder(folder)) {
			expresso_local_messages.set_message_flag(msg_number,flag, func_after_flag_change);
		}
		else {
			set_message_flag(msg_number,flag, func_after_flag_change);
		}
	}
	
	messages_proxy.prototype.is_local_folder = function(folder) {
		if(typeof(folder) == "undefined" || folder.indexOf("local_")==-1)
			return false;
		return true;
	}
	
	/*
	messages_proxy.prototype.proxy_rename_folder = function(){
		var specialFolders = special_folders[ttree.getFolder().split(cyrus_delimiter)[ttree.getFolder().split(cyrus_delimiter).length-1]]; 
		if (ttree.getFolder() == 'INBOX' || specialFolders ) {
			alert(get_lang("It's not possible rename the folder: ") + lang_folder((specialFolders ? specialFolders : ttree.getFolder()))+ '.');
			return false;
		}
		if(ttree.getFolder() == 'root') {
			alert(get_lang("It's not possible rename this folder!"));
			return false;
		}
		if(!specialFolders && ttree.getFolder() == get_current_folder()){
				alert(get_lang("It's not possible rename this folder, because it is being used in the moment!"));
				return false;
		}
                
		if (this.is_local_folder(ttree.getFolder())) {
			folder = prompt(get_lang("Enter a name for the box"), "");
			if(folder.match(/[\/\\\!\@\#\$\%\&\*\+\(\)]/gi)){
			alert(get_lang("It's not possible rename this folder. try other folder name"));
			return false;
			}
			if(trim(folder) == "" || trim(folder) == null){
				alert(get_lang("you have to enter the name of the new folder"));
				return false;
			}
			var temp = expresso_local_messages.rename_folder(folder, ttree.FOLDER.substr(6));
			if (!temp) 
				alert(get_lang("cannot rename folder. try other folder name"));
			ttreeBox.update_folder();
		}
		else {
			ttreeBox.validate("rename");
		}
		
	}
	*/
	/*
	messages_proxy.prototype.proxy_create_folder = function() {
		if (folders.length == preferences.imap_max_folders){ 
 		    alert(get_lang("Limit reached folders")); 
 		    return false; 
 		} 
		
		if (this.is_local_folder(ttree.FOLDER)) {
			folder = prompt(get_lang('Enter the name of the new folder:'), "");

                        if(folder == null)
                            return;


			if(trim(folder) == ""){
				alert(get_lang("you have to enter the name of the new folder"));
				return false;
			}
			if(folder.match(/[\/\\\!\@\#\$\%\&\*\+\(\)]/gi)){
			    alert(get_lang("cannot create folder. try other folder name"));
			    return false;
			}
			if(ttree.FOLDER=="local_root")
				var temp = expresso_local_messages.create_folder(folder);
			else
				var temp = expresso_local_messages.create_folder(ttree.FOLDER.substr(6)+"/"+folder);
			if (!temp) 
				alert(get_lang("cannot create folder. try other folder name"));
			ttreeBox.update_folder(true);
		}
		else			
			if(ttree.FOLDER == "INBOX")
				alert(get_lang("It's not possible create inside: ") + lang_folder(ttree.FOLDER)+".");
			else if (!this.is_local_folder(ttree.FOLDER))
				ttreeBox.validate("newpast");
			else 
				alert(get_lang("It's not possible create inside: ") + lang_folder(ttree.FOLDER.substr(6))+".");
	}
	*/
	/*
	messages_proxy.prototype.proxy_remove_folder = function() {
		if (this.is_local_folder(ttree.FOLDER)) {
			if(ttree.FOLDER == 'local_root') {
				alert(get_lang("Select a folder!"));
				return false;
			}
			if (ttree.FOLDER == 'local_Inbox' || (preferences.auto_create_local == '1' && (ttree.FOLDER == 'local_Sent' || ttree.FOLDER == 'local_Drafts' || ttree.FOLDER == 'local_Trash'))) {
				alert(get_lang("It's not possible delete the folder: ")  + lang_folder(ttree.FOLDER.substr(6)) + '.');
				return false;
			}
                        if(ttree.FOLDER.match("^local_.*$") && ttree.FOLDER == get_current_folder()){
                            alert(get_lang("It's not possible rename this folder, because it is being used in the moment!"));
                            return false;
                        }

			if(ttree.FOLDER.indexOf("/")!="-1") {
				final_pos = ttree.FOLDER.lastIndexOf("/");
				new_caption = ttree.FOLDER.substr(final_pos+1);
			}
			else {
				new_caption = ttree.FOLDER.substr(6);
			}
			var string_confirm = get_lang("Do you wish to exclude the folder ") + new_caption + "?";

			if (confirm(string_confirm)) {
				var flag = expresso_local_messages.remove_folder(ttree.FOLDER.substr(6));
				if (flag) {
					write_msg(get_lang("The folder %1 was successfully removed", new_caption));
					draw_tree_local_folders();
					ttreeBox.update_folder(true);
				}
				else 
					alert(get_lang("Delete your sub-folders first"));
				
			}
		}
		else
			ttreeBox.del();
	}*/

	messages_proxy.prototype.proxy_move_messages = function (folder, msgs_number, border_ID, new_folder, new_folder_name) {
		if (! folder || folder == 'null')
			folder = Element("input_folder_"+msgs_number+"_r") ? Element("input_folder_"+msgs_number+"_r").value : (openTab.imapBox[currentTab] ? openTab.imapBox[currentTab]:get_current_folder());
		if ((this.is_local_folder(folder)) && (this.is_local_folder(new_folder))) { //Move entre pastas n�o locais...
			if (folder == new_folder){
				write_msg(get_lang('The origin folder and the destination folder are the same.'));
				return;
			}
			if(msgs_number=='selected')
				msgs_number = get_selected_messages();
			if (new_folder == 'local_root')
				alert(get_lang("Select a folder!"));
			if (parseInt(msgs_number) > 0 || msgs_number.length > 0) {
				expresso_local_messages.move_messages(new_folder.substr(6), msgs_number);
				this.aux_interface_remove_mails(msgs_number, new_folder_name, border_ID);
				draw_tree_local_folders();
                                update_local_box();
			}
			else 
				write_msg(get_lang('No selected message.'));
		}
		else 
			if ((!this.is_local_folder(folder)) && (!this.is_local_folder(new_folder))) { //Move entre pastas locais...
				move_msgs(folder, msgs_number, border_ID, new_folder, new_folder_name);
			}else if ((!this.is_local_folder(folder)) && (this.is_local_folder(new_folder))) {
				if(msgs_number=='selected')
					archive_msgs(folder,new_folder);
				else
					archive_msgs(folder,new_folder,msgs_number);

				
				draw_tree_local_folders();
				refresh();
			}
			else {
                //Por Bruno Costa (bruno.vieira-costa@serpro.gov.br) permite o desarquivamento de menssagens chamando a fun��o unarchive_msgs quando uma msg � movida de uma pasta local para uma pasta remota.

				expresso_local_messages.unarchive_msgs(folder,new_folder,msgs_number);
                //write_msg(get_lang("you can't move mails from local to server folders"));
			}
		
		
	}
	
	messages_proxy.prototype.proxy_move_search_messages = function(border_id, new_folder, new_folder_name) {
		
		
		/*
		
		
		if ((this.is_local_folder(folder)) && (this.is_local_folder(new_folder))) { //Move entre pastas n�o locais...
			if (folder == new_folder){
				write_msg(get_lang('The origin folder and the destination folder are the same.'));
				return;
			}
			if(msgs_number=='selected')
				msgs_number = get_selected_messages();
			if (new_folder == 'local_root')
				alert(get_lang("Select a folder!"));
			if (parseInt(msgs_number) > 0 || msgs_number.length > 0) {
				expresso_local_messages.move_messages(new_folder.substr(6), msgs_number);
				this.aux_interface_remove_mails(msgs_number, new_folder_name, border_ID);
			}
			else 
				write_msg(get_lang('No selected message.'));
		}
		else 
			if ((!this.is_local_folder(folder)) && (!this.is_local_folder(new_folder))) { //Move entre pastas locais...
				move_msgs(folder, msgs_number, border_ID, new_folder, new_folder_name);
			}
			else if ((!this.is_local_folder(folder)) && (this.is_local_folder(new_folder))) {
				archive_msgs(folder,new_folder);
			}
			else {
				write_msg(get_lang("you can't move mails from local to server folders"));
			}*/
	}
	
	messages_proxy.prototype.aux_interface_remove_mails = function(msgs_number,new_folder_name,border_ID,previous_msg) {
		if(!msgs_number)
			msgs_number = currentTab.toString().substr(0,currentTab.toString().indexOf("_r")); 
			
		if(msgs_number === ""){
			write_msg(get_lang('No selected message.')); 
			return;
		}
		
		Element('chk_box_select_all_messages').checked = false;
		mail_msg = Element("tbody_box");
		msgs_number = msgs_number.split(",");
		var msg_to_delete;
		this.previous = 0;
		for (var i=0; i<msgs_number.length; i++){
			msg_to_delete = Element(msgs_number[i]);
			if (msg_to_delete){
				if ( (msg_to_delete.style.backgroundColor != '') && (preferences.use_shortcuts == '1') )
					select_msg('null', 'down');
					
				  if (parseInt(preferences.delete_and_show_previous_message) && msg_to_delete && currentTab.toString().indexOf("_r") > 0)
				for(var ii=0; ii < mail_msg.rows.length; ii++){
					if(mail_msg.rows[ii] === msg_to_delete){
						if(ii == 0){
							break;
						}else{
							this.previous = mail_msg.rows[(ii - 1)].attributes[0];
							this.previous = parseInt(this.previous.value); 
							break;
						}
					}
				}
				mail_msg.removeChild(msg_to_delete);
			}
		}
		new_folder_name = this.get_folder_name(new_folder_name);
		if (msgs_number.length == 1)
			write_msg(get_lang("The message was moved to folder ") + new_folder_name);
		else
			write_msg(get_lang("The messages were moved to folder ") + new_folder_name);

		if (parseInt(preferences.delete_and_show_previous_message) && msg_to_delete && this.previous){
			proxy_mensagens.get_msg(this.previous, folder, true, show_msg);
		}else if(currentTab != 0){
		if (border_ID != '' && border_ID != 'null'){
				delete_border(border_ID,'false');
			}else{
				delete_border(currentTab,'false');
			}
		}
		if(folder == get_current_folder())
			Element('tot_m').innerHTML = parseInt(Element('tot_m').innerHTML) - msgs_number.length;			
	}

	messages_proxy.prototype.get_folder_name = function(new_folder_name){
		switch (new_folder_name) {
			case 'local_Inbox':
				return 'Local_Caixa de Entrada';
			case 'local_Sent':
				return 'Local_Enviados';
			case 'local_Trash':
				return 'Local_Lixeira';
			case 'local_Drafts':
				return 'Local_Rascunhos';
			default:
				return new_folder_name;
		}
	}
	
   	messages_proxy.prototype.msg_img = function(msgs_number,folder_name,call_back) {
     if(this.is_local_folder(folder_name)){
         var msg = expresso_local_messages.get_local_mail(msgs_number);
		 eval('call_back(msg)');
     }
     else
	 $.ajax({
		  url: 'controller.php?' + $.param( {action: '$this.imap_functions.get_info_msg',
						      msg_number: msgs_number, 
						      msg_folder: folder_name,
						      decoded: true } ),
		  success: function( data ){
		      data = connector.unserialize( data );
		      
		      if( data )
			  call_back( data );
		  },
		  beforeSend: function( jqXHR, settings ){
		  	connector.showProgressBar();
		  },
		  complete: function( jqXHR, settings ){
		  	connector.hideProgressBar();
		  }

	});
    }

    messages_proxy.prototype.export_all_messages = function(folder){

		if (!folder){
			folder = get_current_folder();
		}

		if(!this.is_local_folder(folder)){
			export_all_selected_msgs();
		}else{
			local_messages.prototype.local_messages_to_export();
		}
	}
	/*
    	messages_proxy.prototype.proxy_export_all_msg=function(){

		var er=/^local/;


		if(ttree.getFolder() == "local_root" || ttree.getFolder() == "root"){return false;}   //Usuario n�o selecionou uma pasta local e esta no come�o dos n�s
		var nm_bx = ttree.getFolder().split(cyrus_delimiter);

		var name_f = nm_bx[nm_bx.length -1].replace("local_","");

		if (!er.test(nm_bx)){
			//Se a pasta nao for local, ou seja a string nao contem a string "local"
			ttreeBox.export_all_msg();
		} else{
			expresso_local_messages.get_all_local_folder_messages(name_f);
		}
	}
	*/
	var proxy_mensagens;
	proxy_mensagens = new messages_proxy();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         