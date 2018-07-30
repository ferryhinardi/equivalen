/*** Menyiapkan dokumen awal dan reset setiap halaman ***/
$(document).ready(function(){
	/* Cek apakah aplikasi sudah expired */
	checkExpDate();
	if(typeof(localStorage.expired)==="undefined"){
		/* Deklarasi variabel global yang dibutuhkan */
		$arrSoal=new Array();
		
		/* Setting posisi konten di tengah layar */
		$("#main-bg").height(window.innerHeight);
		$("#main-container").css("padding-top",(window.innerHeight-$("#main-container").height())/2+"px");
		
		/* Cek local session sedang berada di halaman login atau mata pelajaran atau pengerjaan soal */
		if(typeof(localStorage.session)!=="undefined"){
			if(localStorage.session==="loggedin")
				showMatpel();
			else if(localStorage.session==="doing")
				showSoal();
		}else{
			showLogin();
		}
	}
});

/*** Mengecek tanggal expired aplikasi ***/
function checkExpDate(){
	var td=dataExpDate.split("/");
	var cd=td[1]+"/"+td[0]+"/"+td[2];
	var ed=new Date(cd).getTime();
	if(new Date().getTime()>=new Date(ed).getTime())
		localStorage.setItem("expired",1);
}
	
/*** Menampilkan halaman login ***/
function showLogin(){
	/* Menampilkan konten halaman login */
	showLayout("login");
	
	/* Tombol masuk ke sistem */
	$("#home-btn-masuk").click(function(){
		loginForm();
	});
	
	/* Handle ketika menekan tombol enter */
	$(document).keypress(function(e){
		if(e.which == 13)
			loginForm()
	;});
	
	/* Handle input nomor pada nomor induk dan kelas */
	$("#input-nomorinduk").on("keydown",function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
	$("#input-namalengkap").focus();
}

/*** Pengecekan pada saat login ***/
function loginForm(){	
	/* Cek apakah semua field sudah terisi */
	if($.trim($("#input-namalengkap").val())==""||$.trim($("#input-nomorinduk").val())==""||$.trim($("#input-sekolah").val())==""||$.trim($("#input-kelas").val())==""){
		alert("Silakan isi data terlebih dahulu dengan benar.");
		
		/* Fokus kursor ke field yang belum terisi */
		$(".home-login input").each(function(){
			if($(this).val()==""){
				$(this).focus();
				return false;
			}
		});
		return false;
	}else{
		/* Set local storage untuk persiapan masuk ke sistem */
		localStorage.setItem("session","loggedin")
		localStorage.setItem("namalengkap",$("#input-namalengkap").val());
		localStorage.setItem("nomorinduk",$("#input-nomorinduk").val());
		localStorage.setItem("kelas",$("#input-kelas").val());
		localStorage.setItem("sekolah",$("#input-sekolah").val());
		location.reload();
	}
}

/*** Logout dari sistem ***/
function logoutForm(){
	/* Reset local storage session */
	localStorage.removeItem("session");
}

/*** Menampilkan jenis mata pelajaran ***/
function showMatpel(){
	/* Menampilkan konten halaman pilih mata pelajaran */
	showLayout("pilihmatpel");
	for(var i = 0; i < dataArrMatPel.length; i++)
		$(".choose-matpel-icon").append('<div class="matpel-icon" data-matpel="' + dataArrMatPel[i] + '" data-jmlpaket="' + dataArrPaket[i] + '" data-iconmatpel="img-icon-' + dataArrMatPel[i] + '.png"><div> <img src="images/img-icon-' + dataArrMatPel[i] + '.png" alt="icon matpel ' + dataArrMatPel[i] + '"> <img src="images/img-texticon-' + dataArrMatPel[i] + '.png" alt="text icon matpel ' + dataArrMatPel[i] + '"></div></div>')
	
	setTimeout(function(){
		$matpelContainer = $(".choose-matpel-container");
		$matpelContainer.css("padding-top", ($matpelContainer.parent().height() - $matpelContainer.height()) / 2 + "px");
	}, 10);
	
	$(".matpel-icon").click(function(){
		showTryout($(this));
	});
}

/*** Menampilkan pilihan paket tryout ***/
function showTryout(matpel){
	localStorage.setItem("jmlpaket", matpel.data("jmlpaket"));
	for($i = 1; $i <= localStorage.jmlpaket; $i++){
		$(".choose-tryout").append('<label data-jmlsoal="' + dataArrJmlSoal[matpel.index()][$i - 1] + '">Tryout ' + $i + '</label>');
	}
	$(".choose-tryout").append('<label data-jmlsoal="' + dataArrJmlSoal[matpel.index()][0] + '">Random Soal</label>');
	$(".dialog-tryout").show();
	
	$(".choose-tryout label").click(function(){
		if(localStorage.session === "doing"){
			$("#main-bg").append('<div class="dialog-blackout"></div>');
			var thisButton = $(this);
			setTimeout(function(){
				var alertKeluar = confirm("Apakah anda yakin ingin mengakhiri latihan? Semua soal yang telah anda kerjakan tidak akan tersimpan.");
				if(alertKeluar == true){
					localStorage.setItem("namamatpel", matpel.data("matpel"));
					localStorage.setItem("paketke", (thisButton.index() + 1));
					localStorage.setItem("jmlsoal", thisButton.data("jmlsoal"));
					localStorage.setItem("iconmatpel", matpel.data("iconmatpel"));
					localStorage.setItem("duration", 7199);
					clearSoal();
					clearJawaban();
					showSoal();
					location.reload();
				} else {
					$(".dialog-blackout").remove();
				}
			}, 1);
		} else {
			localStorage.setItem("namamatpel", matpel.data("matpel"));
			localStorage.setItem("paketke", $(this).index() + 1);
			localStorage.setItem("jmlsoal", $(this).data("jmlsoal"));
			localStorage.setItem("iconmatpel", matpel.data("iconmatpel"));
			localStorage.setItem("duration", 7199);
			localStorage.setItem("session","doing");
			showSoal();
			location.reload();
		}
	});
}

/*** Menutup dialog box pilihan paket ***/
function closeDialogTryout(){
	$(".choose-tryout label").each(function(){
		$(this).remove();
	});
	$(".dialog-tryout").hide();
	return false;
}

/*** Menampilkan soal ***/
function showSoal(){
	showLayout("soalujian");
		
	/* Menyiapkan soal */
	if(typeof(localStorage.soal0) !== "undefined"){
		for(var i = 0; i < localStorage.jmlsoal; i++)
			$arrSoal.push(localStorage.getItem("soal" + i));
	} else {
		/* Random soal */
		var indexMatpel = dataArrMatPel.indexOf(localStorage.namamatpel);
		if(localStorage.paketke > dataArrPaket[indexMatpel]){
			var arrIndexShuffle = new Array();
			var divSoal = Math.floor(localStorage.jmlsoal / dataArrPaket[indexMatpel]);
			var modSoal = localStorage.jmlsoal % dataArrPaket[indexMatpel];
			var trueCounter = 0;
			
			for(var i = 0; i < dataArrPaket[indexMatpel]; i++)
				arrIndexShuffle.push(i + "-true");
			
			for(var i = 0; i < divSoal; i++){
				shuffleArray(arrIndexShuffle);
				for(var j = 0; j < arrIndexShuffle.length; j++){
					if(arrIndexShuffle[j].split("-")[1] === "true"){
						$arrSoal.push(arrIndexShuffle[j].split("-")[0]);
						localStorage.setItem("soal" + trueCounter, arrIndexShuffle[j].split("-")[0]);
						trueCounter++;
					}else
						arrIndexShuffle[j] = arrIndexShuffle[j].split("-")[0] + "-false";
				}
			}
			if(modSoal > 0){
				for(var i = 0; i < modSoal; i++){
					shuffleArray(arrIndexShuffle);
					if(arrIndexShuffle[i].split("-")[1] === "true"){
						$arrSoal.push(arrIndexShuffle[i].split("-")[0]);
						localStorage.setItem("soal" + trueCounter, arrIndexShuffle[i].split("-")[0]);
					}else
						arrIndexShuffle[i] = arrIndexShuffle[i].split("-")[0] + "-false";
					trueCounter++;
				}
			}
		} else {
			for(var i = 0; i < localStorage.jmlsoal; i++)
				$arrSoal.push(localStorage.paketke - 1);
		}
	}
	
	var arrNamaMatpel = ["BAHASA INDONESIA", "BAHASA INGGRIS", "MATEMATIKA", "IPA"];
	for(var i = 0; i < dataArrMatPel.length; i++)
		$(".menuright-jenismatpel").append('<h6 data-matpel="' + dataArrMatPel[i] + '" data-jmlpaket="' + dataArrPaket[i] + '" data-iconmatpel="img-icon-' + dataArrMatPel[i] + '.png">' + arrNamaMatpel[i] + '</h6>');
	
	$(".img-icon-matpel").attr("src", "images/" + localStorage.iconmatpel);
	$(".nama-lengkap h5").html(localStorage.namalengkap);
	
	var indexMatpel = dataArrMatPel.indexOf(localStorage.namamatpel);
	if(localStorage.paketke > dataArrPaket[indexMatpel]){
		$(".sisa-waktu").after('<span class="load-soal"><select class="select-soal"><option value="0">-- Pilih Soal --</option></select></span>');
		for(var i = 1; i <= localStorage.jmlSaved; i++)
			$(".select-soal").append('<option value="' + i + '">' + localStorage.getItem("tanggal" + i) + ' - Saved ' + i + '</option>');
	}
	
	//localStorage.setItem("pathmatpel", "data-matpel/" + localStorage.namamatpel + "/" + localStorage.paketke + "-soal-jawab/");
	localStorage.setItem("pathmatpel", "data-matpel/" + localStorage.namamatpel + "/");
	gantiSoal($(".nomor-soal").val());
	$duration = localStorage.duration;
	$timer = setInterval(function(){startTimer();}, 1000);
	
	for($i = 1; $i <= localStorage.jmlpaket; $i++){
		$(".menuright-jmlpaket").append('<div><h6>' + $i + '</h6></div>');
	}
	
	for($i = 1; $i <= localStorage.jmlsoal; $i++){
		var nomor = $i < 10 ? "0" + $i : $i;
		if($i == 1)
			$(".list-jawab").append('<div class="soal-ini"><p>' + nomor + '. <span></span></p></div>');
		else
			$(".list-jawab").append('<div><p>' + nomor + '. <span></span></p></div>');
	}
	
	$(".jawaban-container h6").each(function(){
		if($(this).attr("data-jawaban") === localStorage.jawab0)
			$(this).addClass("jawab-ini");
	});
	
	$(".list-jawab div").each(function(){
		$(this).find("span").html(localStorage.getItem("jawab" + $(this).index()));
	});
	$("div.list-jawab").height($("div.tabel-jawab").innerHeight() - $("p.judul-list-jawab").innerHeight() - ($("p.btn-selesai-jawab").innerHeight() * 2));
	
	/*** Fungsi untuk tombol-tombol ***/
	/* Tombol pilih saved tryout */
	$(".select-soal").change(function(){
		var valChoose = $(".select-soal option:selected").val();
		var tempSoal = localStorage.getItem("saved" + valChoose);
		var ctr = 0;
		tempSoal.split("-");
		
		for(var i = 0; i < tempSoal.length - 1; i++){
			if(tempSoal[i] !== "-"){
				localStorage.setItem("soal" + ctr, + tempSoal[i]);
				ctr++;
			}
		}
		
		localStorage.setItem("namamatpel", localStorage.getItem("namamatpel" + valChoose));
		localStorage.setItem("jmlpaket", localStorage.getItem("jmlpaket" + valChoose));
		localStorage.setItem("paketke", localStorage.getItem("paketke" + valChoose));
		localStorage.setItem("jmlsoal", localStorage.getItem("jmlsoal" + valChoose));
		localStorage.setItem("iconmatpel", localStorage.getItem("iconmatpel" + valChoose));
		localStorage.setItem("duration", 7199);
		clearJawaban();
		showSoal();
		location.reload();
	});
	
	/* Tombol toggle menu kanan */
	$(".btn-menu-right").click(function(){
		if($(".menu-right-toggle").hasClass("toggled"))
			setTimeout(function(){
				$(".menu-right-toggle").removeClass("toggled");
			}, 10);
		else
			setTimeout(function(){
				$(".menu-right-toggle").addClass("toggled")
			}, 10);
	});
	
	$(window).click(function(e){
		if($(".menu-right-toggle").hasClass("toggled"))
			$(".menu-right-toggle").removeClass("toggled");
	});
	
	$(".menu-right-toggle").click(function(e){
		e.stopPropagation();
	});
	
	/* Tombol toggle menu kanan pilih paket */
	$(".btn-menuright-pilihpaket > h6").click(function(){
		if($(".menuright-jmlpaket").hasClass("toggled"))
			$(".menuright-jmlpaket").removeClass("toggled");
		else
			$(".menuright-jmlpaket").addClass("toggled");
	});
	
	/* Tombol menu kanan pilih paket */
	$(".menuright-jmlpaket h6").click(function(){
		$("#main-bg").append('<div class="dialog-blackout"></div>');
		var thisButton = $(this);
		setTimeout(function(){
			var alertKeluar = confirm("Apakah anda yakin ingin mengakhiri latihan? Semua soal yang telah anda kerjakan tidak akan tersimpan.");
			if(alertKeluar == true){
				localStorage.setItem("paketke", thisButton.text());
				localStorage.setItem("jmlsoal", dataArrJmlSoal[dataArrMatPel.indexOf(localStorage.namamatpel)][thisButton.text() - 1]);
				localStorage.setItem("duration", 7199);
				clearSoal();
				clearJawaban();
				showSoal();
				location.reload();
			} else {
				$(".dialog-blackout").remove();
			}
		}, 1);
	});
		
	/* Tombol toggle menu kanan pilih matpel */
	$(".btn-menuright-pilihmatpel > h6").click(function(){
		if($(".menuright-jenismatpel").hasClass("toggled"))
			$(".menuright-jenismatpel").removeClass("toggled");
		else
			$(".menuright-jenismatpel").addClass("toggled");
	});
	
	/* Tombol menu kanan pilih matpel */
	$(".menuright-jenismatpel h6").click(function(){
		showTryout($(this));
	});
	
	/* Tombol menu kanan keluar */
	$(".btn-menuright-keluar").click(function(){
		showKonfirmasiKeluar();
	});
	
	/* Tombol toggle table jawab */
	$(".btn-toggle-jawab").click(function(){
		if($(".jawaban-toggle").hasClass("toggled"))
			$(".jawaban-toggle").removeClass("toggled");
		else
			$(".jawaban-toggle").addClass("toggled");
	});
	
	/* Tombol pilih nomor soal */
	$(".list-jawab div").click(function(){
		gantiSoal($(this).index() + 1);
	});
	
	/* Tombol selesai jawab */
	$(".btn-selesai-jawab").click(function(){
		$("#main-bg").append('<div class="dialog-konfirmasi"><div class="box-konfirmasi"><h6>Konfirmasi<span class="btn-tutup-konfirmasi">x</span></h6><div class="text-konfirmasi"><div class="text-kosong-ragu"><h6 class="info-kosong-ragu">Soal Anda masih ada yang belum terjawab!</h6><h5 class="jumlah-kosong"><span></span> soal belum dijawab</h5><h5 class="jumlah-ragu"><span></span> soal ragu-ragu</h5></div><h6 class="text-yakin-selesai">Apakah Anda ingin menjawab dan kembali ke halaman soal tersebut?</h6><p><br>Jika Anda ingin melanjutkan, silahkan klik tombol (Kembali)<br><br>Jika tidak, Anda dapat mengklik tombol (Selesai) untuk melihat hasil</p></div><hr><div class="div-btn-konfirmasi"> <button class="btn-konfirmasi kembali">Kembali</button> <button class="btn-konfirmasi selesai">Selesai</button></div></div></div>');
		showKonfirmasiSelesai();
	});
	
	/* Tombol ke nomor soal sebelumnya */
	$(".btn-navleft").click(function(){
		gantiSoal(parseInt($(".nomor-soal").val()) - 1);
	});
	
	/* Tombol ke nomor soal sesudahnya */
	$(".btn-navright").click(function(){
		gantiSoal(parseInt($(".nomor-soal").val()) + 1);
	});
	
	/* Tombol jawaban ragu-ragu */
	$(".btn-navmid").click(function(){
		if($(".list-jawab .soal-ini").hasClass("jawab-ragu"))
			$(".list-jawab .soal-ini").removeClass("jawab-ragu");
		else
			$(".list-jawab .soal-ini").addClass("jawab-ragu");
	});
	
	/* Tombol pilih jawaban */
	$(".jawaban-container h6").click(function(){
		$(".jawaban-container h6").removeClass("jawab-ini");
		$(this).addClass("jawab-ini");
		$(".list-jawab .soal-ini p span").html($(this).data("jawaban"));
		localStorage.setItem("jawab" + $(".list-jawab .soal-ini").index(), $(this).data("jawaban"));
	});
	
	$(window).bind("beforeunload", function(){
		localStorage.duration = $duration;
	});
}

/*** Menampilkan timer pada saat tryout ***/
function startTimer(){
	var hours = Math.floor($duration / 3600);
	var minutes = Math.floor(($duration % 3600) / 60);
	var seconds = Math.floor($duration % 60);

	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	
	$(".sisa-waktu h6").html(hours + ":" + minutes + ":" + seconds);
	$duration--;
	
	if($duration < 0){
		clearInterval($timer);
		var arrJawabRagu = checkRagu();
		$("#main-bg").append('<div class="dialog-konfirmasi"></div>');
		$(".dialog-konfirmasi").append('<div class="box-hasil-ujian"><h6>Hasil Anda</h6><div class="text-konfirmasi"><div class="text-hasil"><h3 class="hasil-nilai">0</h3><h6 class="hasil-jumlah-benar">Jumlah Benar: <span>0 / 10</span></h6><h6 class="hasil-jumlah-salah">Jumlah Salah: <span>0 / 10</span></h6><h6 class="hasil-jumlah-kosong">Tidak Terjawab: <span>0 / 10</span></h6></div><p><br>Jika Anda ingin mencoba lagi, silahkan klik tombol (Coba Lagi)<br><br>Jika tidak, Anda dapat mengklik tombol (Pembahasan) untuk melihat pembahasan.</p></div><hr><div class="div-btn-konfirmasi"> <button class="btn-konfirmasi lihat-hasil">Lihat Hasil</button> <button class="btn-konfirmasi coba-lagi">Coba Lagi</button> <button class="btn-konfirmasi pembahasan">Pembahasan</button></div></div>').show();
		prosesNilai(arrJawabRagu);
	}
}

/*** Mengganti nomor soal ***/
function gantiSoal(nomorSoal){
	if(nomorSoal == 0)
		nomorSoal = 1;
	else if(nomorSoal > localStorage.jmlsoal)
		nomorSoal = localStorage.jmlsoal;
	
	$(".nomor-soal").val(nomorSoal);
	$(".soal-container h6 span").html(nomorSoal + ". ");
	
	$(".list-jawab div").removeClass("soal-ini");
	$(".list-jawab div").eq(nomorSoal - 1).addClass("soal-ini");
	
	$(".jawaban-container h6").each(function(){
		if($(".list-jawab .soal-ini p span").html() == $(this).data("jawaban"))
			$(this).addClass("jawab-ini");
		else
			$(this).removeClass("jawab-ini");
	});
	
	$(".img-soal").attr("src", localStorage.pathmatpel + (parseInt($arrSoal[nomorSoal - 1]) + 1) + "-soal-jawab/" + nomorSoal + "-soal.png");
	
	var arrJawab = ["a", "b", "c", "d"];
	var ctr = 0;
	$(".jawaban-container h6 img").each(function(){
		$(this).attr("src", localStorage.pathmatpel + (parseInt($arrSoal[nomorSoal - 1]) + 1) + "-soal-jawab/" + nomorSoal + "-" + arrJawab[ctr] + ".png");
		ctr++;
	});
}

/*** Menampilkan dialog konfirmasi selesai ***/
function showKonfirmasiKeluar(){
	$("#main-bg").append('<div class="dialog-blackout"></div>');
	setTimeout(function(){
		var alertKeluar = confirm("Apakah anda yakin ingin keluar dari aplikasi? Semua soal yang telah anda kerjakan tidak akan tersimpan.");
		if(alertKeluar == true){
			clearSoal();
			clearJawaban();
			logoutForm();
			location.reload();
		} else {
			$(".dialog-blackout").remove();
		}
	}, 1);
}

/*** Menampilkan dialog konfirmasi selesai ***/
function showKonfirmasiSelesai(){
	var kosong = jawabragu = 0;
	$(".list-jawab div").each(function(){
		if($(this).find("span").text() == "")
			kosong += 1;
		
		if($(this).hasClass("jawab-ragu")){
			jawabragu += 1;
		}
	});
	var arrJawabRagu = checkRagu();
	
	if(kosong > 0){
		$(".jumlah-kosong span").html(kosong);
		$(".info-kosong-ragu,.jumlah-kosong").show();
	}
	
	if(jawabragu > 0){
		$(".jumlah-ragu span").html(jawabragu);
		$(".info-kosong-ragu,.jumlah-ragu").show();
	}
	
	if(kosong == 0 && jawabragu == 0)
		$(".text-yakin-selesai").html("Apakah Anda sudah yakin dengan seluruh jawaban anda?");
	
	$(".dialog-konfirmasi").show();

	/* Tombol tutup dialog konfirmasi untuk kembali mengerjakan soal */
	$(".btn-konfirmasi.kembali,.btn-tutup-konfirmasi").click(function(){
		$(".dialog-konfirmasi").remove();
	});
	
	/* Tombol konfirmasi untuk selesai mengerjakan soal dan melihat hasil */
	$(".btn-konfirmasi.selesai").click(function(){
		clearInterval($timer);
		$lamapengerjaan = 7199 - $duration;
		$(".box-konfirmasi").remove();
		$(".dialog-konfirmasi").append('<div class="box-hasil-ujian"><h6>Hasil Anda</h6><div class="text-konfirmasi"><div class="text-hasil"><h3 class="hasil-nilai">0</h3><h6 class="hasil-jumlah-benar">Jumlah Benar: <span>0 / 10</span></h6><h6 class="hasil-jumlah-salah">Jumlah Salah: <span>0 / 10</span></h6><h6 class="hasil-jumlah-kosong">Tidak Terjawab: <span>0 / 10</span></h6></div><p><br>Jika Anda ingin mencoba lagi, silahkan klik tombol (Coba Lagi)<br><br>Jika tidak, Anda dapat mengklik tombol (Pembahasan) untuk melihat pembahasan.</p></div><hr><div class="div-btn-konfirmasi"> <button class="btn-konfirmasi lihat-hasil">Lihat Hasil</button> <button class="btn-konfirmasi coba-lagi">Coba Lagi</button> <button class="btn-konfirmasi pembahasan">Pembahasan</button></div></div>');
		prosesNilai(arrJawabRagu);
	});
}

function checkRagu(){
	var arrJawabRagu = new Array();
	$(".list-jawab div").each(function(){
		if($(this).hasClass("jawab-ragu"))
			arrJawabRagu.push($(this).index());
	});
	
	return arrJawabRagu;
}

/*** Menilai seluruh jawaban ***/
function prosesNilai(arrJawabRagu){
	switch(localStorage.namamatpel){
		case "bhsindo" : var kunci = dataKunciBindo; var namaMatpel = "Bahasa Indonesia"; break;
		case "bhsing" : var kunci = dataKunciBing; var namaMatpel = "Bahasa Inggris"; break;
		case "mat" : var kunci = dataKunciMat; var namaMatpel = "Matematika"; break;
		case "ipa" : var kunci = dataKunciIpa; var namaMatpel = "IPA"; break;
	}
	var indexMatpel = dataArrMatPel.indexOf(localStorage.namamatpel);
	var paketke = (localStorage.paketke) - 1;
	var ctr = nilai = benar = salah = kosong = 0;
	var arrJawab = new Array();
	var arrJawabBenar = new Array();
	var arrJawabSalah = new Array();
	var ajbs = new Array();
	
	if(localStorage.paketke > dataArrPaket[indexMatpel])
		$(".btn-konfirmasi.lihat-hasil").before('<button class="btn-konfirmasi simpan-soal">Simpan Soal</button>');
	
	$(".list-jawab div").each(function(){
		var jawab = $(this).find("span").text().toLowerCase();
		arrJawab.push(jawab);
		
		if(jawab == ""){
			kosong += 1;
			ajbs.push("0");
		}else if(jawab == kunci[$arrSoal[ctr]][ctr]){
			arrJawabBenar.push($(this).index());
			ajbs.push("1");
			benar += 1;
		}else{
			arrJawabSalah.push($(this).index());
			ajbs.push("0");
			salah += 1;
		}
		
		ctr++;
	});
	
	var baseurlPath = "";
	var temp = location.href.split("/");
	
	for($i = 0; $i < temp.length - 1; $i++){
		baseurlPath += temp[$i] + "/";
	}
	nilai = Math.floor((benar / ctr) * 100);
	
	$(".hasil-nilai").html(nilai);
	$(".hasil-jumlah-benar span").html(benar + " / " + ctr);
	$(".hasil-jumlah-salah span").html(salah + " / " + ctr);
	$(".hasil-jumlah-kosong span").html(kosong + " / " + ctr);
	
	/* Tombol untuk menyimpan soal random */
	$(".btn-konfirmasi.simpan-soal").click(function(){
		var tempSave = "";
		var tempName = 0;
		for(var i = 0; i < $arrSoal.length; i++)
			tempSave += $arrSoal[i] + "-";
		
		if(typeof(localStorage.jmlSaved) == "undefined"){
			localStorage.setItem("jmlSaved", 1);
			localStorage.setItem("saved1", tempSave);
			localStorage.setItem("namamatpel1", localStorage.namamatpel);
			localStorage.setItem("jmlpaket1", localStorage.jmlpaket);
			localStorage.setItem("paketke1", localStorage.paketke);
			localStorage.setItem("jmlsoal1", localStorage.jmlsoal);
			localStorage.setItem("iconmatpel1", localStorage.iconmatpel);
			localStorage.setItem("tanggal1", getDateToday());
			tempName = 1;
		} else {
			var temp = localStorage.jmlSaved;
			localStorage.setItem("jmlSaved", parseInt(temp) + 1);
			localStorage.setItem("saved" + (parseInt(temp) + 1), tempSave);
			localStorage.setItem("namamatpel" + (parseInt(temp) + 1), localStorage.namamatpel);
			localStorage.setItem("jmlpaket" + (parseInt(temp) + 1), localStorage.jmlpaket);
			localStorage.setItem("paketke" + (parseInt(temp) + 1), localStorage.paketke);
			localStorage.setItem("jmlsoal" + (parseInt(temp) + 1), localStorage.jmlsoal);
			localStorage.setItem("iconmatpel" + (parseInt(temp) + 1), localStorage.iconmatpel);
			localStorage.setItem("tanggal" + (parseInt(temp) + 1), getDateToday());
			tempName = parseInt(temp) + 1;
		}
		
		localStorage.setItem("duration", 7199);
		alert("Terima kasih. Soal ini telah tersimpan dengan nama " + getDateToday() + " - Saved " + tempName + ".");
		$(".btn-konfirmasi.simpan-soal").remove();
	});
	
	/* Tombol untuk menyimpan hasil latihan menjadi pdf */
	$(".btn-konfirmasi.lihat-hasil").click(function(){
		simpanHasil(namaMatpel, paketke, arrJawab, arrJawabBenar, arrJawabSalah, arrJawabRagu, kosong, nilai);
	});
	
	/* Tombol untuk mencoba kembali paket soal yang sama */
	$(".btn-konfirmasi.coba-lagi").click(function(){
		localStorage.duration = 7199;
		showSoal();
		location.reload();
		clearJawaban();
	});
	
	/* Tombol untuk melihat tutorial */
	$(".btn-konfirmasi.pembahasan").click(function(){
		$(".dialog-konfirmasi,.menu.top-center .sisa-waktu,.load-soal").remove();
		$(".tryout-mid, .tryout-bottom").empty();
		lihatTutorial(ajbs);
	});
}

/*** Menampilkan tutorial ***/
function lihatTutorial(ajbs){
	switch(localStorage.namamatpel){
		case "bhsindo":var extra=dataExtraBindo;break;
		case "bhsing":var extra=dataExtraBing;break;
		case "mat":var extra=dataExtraMat;break;
		case "ipa":var extra=dataExtraIpa;break;
	}
	
	$(".tryout-mid").append('<div class="tutorial-container"> <input class="nomor-tutorial" type="hidden" value="1"><div class="video-container"> <video class="video-tutorial" controls autoplay> <source src="" type="video/webm"> </video></div></div><div class="tutorial-toggle"><div class="tabel-tutorial"><p class="judul-list-tutorial"><b>TUTORIAL</b></p><div class="list-tutorial"></div></div> <img class="btn-toggle-tutorial" src="images/img-btn-togglejawab.png"></div>');
	$(".video-tutorial source").attr("src", localStorage.pathmatpel + (parseInt($arrSoal[0]) + 1) + "-soal-jawab/1-tutorial.webm");
	
	for(var i = 0; i < $arrSoal.length; i++){
		var tm = te = "";
		if(ajbs[i] != 0){
			tm = '<h6 style="color:#0f0;">' + (i + 1) + '&nbsp;&#10004;</h6>';
		}else{
			tm = '<h6 style="color:#f00;">' + (i + 1) + '&nbsp;&#10008;</h6>';
		}
		
		if(extra[$arrSoal[i]][i] !== "")
			te=localStorage.pathmatpel+(parseInt($arrSoal[i])+1)+'-soal-jawab/'+extra[$arrSoal[i]][i];
			
		$(".list-tutorial").append('<div data-url="' + localStorage.pathmatpel + (parseInt($arrSoal[i]) + 1) + '-soal-jawab/' + (i + 1) + '-tutorial.webm" data-extra="' + te + '" style="background:#118363 url(' + localStorage.pathmatpel + (parseInt($arrSoal[i]) + 1) + '-soal-jawab/' + (i + 1) + '-soal.png) center center no-repeat;background-size:contain;"><span>' + tm + '</span></div>');
		
		if(i == 0)
			if(te !== "")
				$(".img-icon-matpel").after('<span class="btn-extra-tutorial"><button data-vid="' + te + '">Video 2</button></span>');
	}
	
	/* Tombol toggle table tutorial */
	$(".btn-toggle-tutorial").click(function(){
		if($(".tutorial-toggle").hasClass("toggled"))
			$(".tutorial-toggle").removeClass("toggled");
		else
			$(".tutorial-toggle").addClass("toggled");
	});
	
	/* Set ukuran tinggi list video */
	$(".tryout-mid").css("padding","0px");
	$(".tabel-tutorial").width($(".tutorial-container").innerWidth()/3);
	$(".tutorial-toggle").css({"width":($(".tutorial-container").innerWidth()/3)+40+"px","right":"-"+(($(".tutorial-container").innerWidth()/3)+3)+"px"});
	$(".list-tutorial div").height($(".tabel-tutorial").innerHeight() / 3);
	$(".list-tutorial").height($(".tabel-tutorial").innerHeight() - $(".judul-list-tutorial").innerHeight());
	
	/* Tombol untuk memilih tutorial */
	$(".list-tutorial div").click(function(){
		$(".list-tutorial div").removeClass("toggled");
		$(this).addClass("toggled");
		$(".btn-extra-tutorial").remove();
		if($(this).data("extra") !== "")
			$(".img-icon-matpel").after('<span class="btn-extra-tutorial"><button data-vid="' + $(this).data("extra") + '">Video 2</button></span>');
		
		$(".video-tutorial").remove();
		$(".video-container").append('<video class="video-tutorial" controls autoplay> <source src="' + $(this).data("url") + '" type="video/webm">');
		
		/* Tombol untuk memilih video tambahan */
		$(".btn-extra-tutorial button").click(function(){
			$(".video-tutorial").remove();
			$(".video-container").append('<video class="video-tutorial" controls autoplay> <source src="' + $(this).data("vid") + '" type="video/webm">');
		});
	});
	
	/* Tombol untuk memilih video tambahan */
	$(".btn-extra-tutorial button").click(function(){
		$(".video-tutorial").remove();
		$(".video-container").append('<video class="video-tutorial" controls autoplay> <source src="' + $(this).data("vid") + '" type="video/webm">');
	});
	
	clearJawaban();
	$duration=7199;
}

/*** Mendapatkan tanggal hari ini ***/
function getDateToday(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd < 10)
		dd = "0" + dd

	if(mm < 10)
		mm = "0" + mm

	today = mm + "/" + dd + "/" + yyyy;
	return today;
}

/*** Merefresh seluruh soal ***/
function clearSoal(){
	for($i = 0; $i < localStorage.jmlsoal; $i++){
		localStorage.removeItem("soal" + $i);
	}
}

/*** Merefresh seluruh jawaban ***/
function clearJawaban(){
	for($i = 0; $i < localStorage.jmlsoal; $i++){
		localStorage.removeItem("jawab" + $i);
	}
}

/*** Menampilkan hasil dalam bentuk PDF ***/
function simpanHasil(namaMatpel, paketke, arrJawab, arrJawabBenar, arrJawabSalah, arrJawabRagu, kosong, nilai){
	var pdfFile = new jsPDF();
	var dt = new Date();
	var tempImg = "data:image/jpg;base64,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";
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var tempJawab = ""
	
	pdfFile.setFontSize(16);
	pdfFile.text(20, 28, "Hasil Latihan");
	pdfFile.text(20, 30, "___________");
	pdfFile.addImage(tempImg, "jpg", 172, 15, 19, 20);
	pdfFile.rect(148, 19, 20, 13);
	pdfFile.text(132, 28, "Nilai");
	pdfFile.setFontSize(24);
	if(nilai < 10)
		pdfFile.text(156, 28, "" + nilai);
	else if(nilai < 100)
		pdfFile.text(153, 28, "" + nilai);
	else
		pdfFile.text(150, 28, "" + nilai);
	pdfFile.setFontSize(12);
	pdfFile.text(20, 38, "Nama");
	pdfFile.text(60, 38, ": " + (localStorage.namalengkap).toUpperCase());
	pdfFile.text(20, 45, "Mata pelajaran");
	pdfFile.text(60, 45, ": " + namaMatpel);
	pdfFile.text(20, 52, "Paket tryout");
	pdfFile.text(60, 52, paketke > dataArrPaket[dataArrMatPel.indexOf(localStorage.namamatpel)] - 1 ? ": Random Tryout" : ": " + (paketke + 1));
	pdfFile.text(20, 59, "Jumlah soal");
	pdfFile.text(60, 59, ": " + localStorage.jmlsoal);
	pdfFile.text(20, 66, "Lama waktu");
	pdfFile.text(60, 66, ": " + hitungLamaPengerjaan($lamapengerjaan));
	pdfFile.text(120, 45, "Jawaban benar");
	pdfFile.text(160, 45, ": " + arrJawabBenar.length);
	pdfFile.text(120, 52, "Jawaban salah");
	pdfFile.text(160, 52, ": " + arrJawabSalah.length);
	pdfFile.text(120, 59, "Jawaban ragu-ragu");
	pdfFile.text(160, 59, ": " + arrJawabRagu.length);
	pdfFile.text(120, 66, "Tidak dijawab");
	pdfFile.text(160, 66, ": " + kosong);
	pdfFile.setFontSize(16);
	pdfFile.text(20, 80, "Hasil Jawaban");
	pdfFile.text(20, 82, "____________");
	pdfFile.setFontSize(12);
	
	for (var x = 0; x < arrJawab.length / localStorage.jmlsoal; x++){
		for (var y = 0; y < localStorage.jmlsoal; y++){
			pdfFile.setTextColor(0, 0, 0);
			pdfFile.text(20 + x * 40, 90 + y * 7, (x * localStorage.jmlsoal + y + 1) + ". ");
			tempJawab = arrJawab[x * localStorage.jmlsoal + y].toUpperCase();
			
			if(tempJawab !== ""){
				if($.inArray(x * localStorage.jmlsoal + y, arrJawabSalah) + 1){
					pdfFile.setTextColor(255, 0, 0);
					tempJawab;
				}else{
					pdfFile.setTextColor(0, 255, 0);
					tempJawab;
				}
				
				if($.inArray(x * localStorage.jmlsoal + y, arrJawabRagu) + 1){
					//pdfFile.setTextColor(188, 125, 42);
					tempJawab += " [ragu]"
				}
			}else{
				tempJawab = "-";
			}
			
			pdfFile.text(28 + x * 40, 90 + y * 7, tempJawab);
		}
	}
	pdfFile.save((localStorage.namalengkap).toUpperCase() + "_" + namaMatpel + "_" +  dt.getDate() + monthNames[dt.getMonth()] + dt.getFullYear() + ".pdf");
}

/*** Menghitung lama pengerjaan soal ***/
function hitungLamaPengerjaan(lama){
	var hours = Math.floor(lama / 3600);
	var minutes = Math.floor((lama % 3600) / 60);
	var seconds = Math.floor(lama % 60);

	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	
	return (hours + ":" + minutes + ":" + seconds);
}

/*** Melakukan random paket ***/
function shuffleArray(arr){
	for (let i = arr.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
	}
}


/*** CHECK MATPEL ***/
function checkMatpel(pathFile){
	var baseurlPath = "";
	var temp = location.href.split("/");
	
	for($i = 0; $i < temp.length - 1; $i++){
		baseurlPath += temp[$i] + "/";
	}
	var pathUrl = baseurlPath + "data-matpel/" + pathFile;
	
	var newImage = new Image();
	newImage.onload = imageFound;
	newImage.onerror = imageNotFound;
	newImage.src = pathUrl;
}

function imageFound(){
   alert("That image is found and loaded");
}

function imageNotFound(){
	alert("That image was not found.");
}
/*** CHECK MATPEL ***/


/*** Menampilkan layout tiap halaman ***/
function showLayout(page){
	$("#main-container").empty();
	if(page == "login"){
		$("#main-container").append('<div class="home-container"><div class="home-title"> <img src="images/img-title01.png" alt="image title"></div><div class="home-form"> <img src="images/img-logo-ex01.png" alt="image logo ex"><div id="form-login"><div class="home-login"> <input id="input-namalengkap" name="namalengkap" type="text" maxlength="32" placeholder="nama lengkap"> <input id="input-nomorinduk" name="nomorinduk" type="text" maxlength="16" placeholder="no. induk"> <input id="input-kelas" name="kelas" type="text" maxlength="4" placeholder="kelas"> <input id="input-sekolah" name="sekolah" type="text" maxlength="32" placeholder="sekolah"></div> <input id="home-btn-masuk" class="home-btn-submit" type="submit" value="MASUK"></div></div></div>');
	}else if(page == "pilihmatpel"){
		$("#main-container").append('<div class="choose-matpel-container"><div class="choose-matpel-icon"></div><form id="form-logout" name="form-logout" method="post" onsubmit="return logoutForm()"> <input id="home-btn-keluar" class="home-btn-submit" type="submit" value="KELUAR"></form></div>');
		$("#main-bg").append('<div class="dialog-tryout"><div class="box-choose-tryout"><h6>Pilih Tryout</h6><div class="choose-tryout"></div> <button id="btn-close-choose-tryout" class="btn-close" onclick="return closeDialogTryout()">Tutup</button></div></div>');
	}else if(page == "soalujian"){
		$("#main-container").append('<div class="tryout-container"><div class="tryout-top"><div class="menu top-left"> <img class="img-logo-copyright" src="images/img-logo-ex02.png"></div><div class="menu top-center"> <img class="img-icon-matpel" src="images/img-icon-ipa.png"> <span class="sisa-waktu"><h6>00:00:00</h6></span> <span class="nama-lengkap"><h5>NAMA SISWA</h5></span></div><div class="menu top-right"><div class="btn-menu-right"><div></div><div></div><div></div></div><div class="menu-right-toggle"><div class="menu-right-container"><div class="btn-menuright-pilihpaket"><h6>Tryout</h6><div class="menuright-jmlpaket"></div></div><div class="btn-menuright-pilihmatpel"><h6>Mata Pelajaran</h6><div class="menuright-jenismatpel"></div></div><div class="btn-menuright-keluar"><h6>Keluar</h6></div></div></div></div></div><div class="tryout-mid"><div class="soal-jawab-container"> <input class="nomor-soal" type="hidden" value="1"><div class="soal-container"><h6><span>1. </span><img class="img-soal" src=""></h6></div><div class="jawaban-container"><h6 data-jawaban="A"><span>A. </span><img src=""></h6><h6 data-jawaban="B"><span>B. </span><img src=""></h6><h6 data-jawaban="C"><span>C. </span><img src=""></h6><h6 data-jawaban="D"><span>D. </span><img src=""></h6></div></div><div class="jawaban-toggle"><div class="tabel-jawab"><p class="judul-tabel-jawab"><b>JAWABAN</b></p><div class="list-jawab"></div><p class="btn-selesai-jawab"><b>SELESAI</b></p></div> <img class="btn-toggle-jawab" src="images/img-btn-togglejawab.png"></div></div><div class="tryout-bottom"><div class="nav-soal"> <img class="btn-navleft" src="images/img-btn-navleft.png"> <img class="btn-navmid" src="images/img-btn-navmid.png"> <img class="btn-navright" src="images/img-btn-navright.png"></div></div></div>');
		$("#main-bg").append('<div class="dialog-tryout"><div class="box-choose-tryout"><h6>Pilih Tryout</h6><div class="choose-tryout"></div> <button id="btn-close-choose-tryout" class="btn-close" onclick="return closeDialogTryout()">Tutup</button></div></div>');
	}
}