// ==UserScript==
// @name         FuckItWeButt
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Unhide "Download" & "Save" buttons on Chaoxing clouddisk share pages for "suspicious" filetypes.
// @author       Pairman <pairmanxlr@gmail.com>
// @match        https://pan-yz.chaoxing.com/external/m/file/*
// @match        https://pan-yz.cldisk.com/external/m/file/*
// @supportURL   https://github.com/Pairman/FuckItWeButt
// @license      GPLv3
// ==/UserScript==

(function() {
	'use strict';

	function fuckItWeButt() {
		if ($('#download').length && $('#saveyp').length)
			return;

		$.ajax({
			url: `https://noteyd.chaoxing.com/screen/note_note/files/status/${fileinfo.objectId}`,
			success: function(d) {
				fileinfo.download = d.download;
			}
		});

		$('#reportFileBtn').before(
			'<a id="download"><span class="YpBtn">下载</span></a>' +
			'<a id="saveyp"><span class="YpBtn yellowBg">保存到云盘</span></a>'
		);
		$('<script>').text($('body > script:nth-child(5)').text()).appendTo('body');
	}

	if (document.readyState == 'complete')
		fuckItWeButt();
	else
		window.addEventListener('load', fuckItWeButt);
})();
