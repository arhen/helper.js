function substr(str, start, end) {
	return str.substring(start, (start + end));
}

function tgl_indo(tgl) {
	if (tgl == "0000-00-00") return "-";
	else {
		tanggal = substr(tgl, 8, 2);
		bulan = get_bulan(substr(tgl, 5, 2));
		tahun = substr(tgl, 0, 4);

		return tanggal + ' ' + bulan + ' ' + tahun;
	}
}

function tgl_db(tgl, todb = false) {
	if (substr(tgl, 2, 1) == '/') { // ini format mm/dd/yyyy
		bulan = substr(tgl, 0, 2);
		tanggal = substr(tgl, 3, 2);
		tahun = substr(tgl, 6, 4);
		return tahun + '-' + bulan + '-' + tanggal;
	} else {
		tahun = substr(tgl, 0, 4);
		bulan = substr(tgl, 5, 2);
		tanggal = substr(tgl, 8, 2);
		return bulan + '/' + tanggal + '/' + tahun;
	}
}

function format_tgl(tgl, indo = true) {
	if (substr(tgl, 2, 1) == '-') { // ini format dd-mm-yyyy
		tanggal = substr(tgl, 0, 2);
		bulan = substr(tgl, 3, 2);
		tahun = substr(tgl, 6, 4);

		return tahun + '-' + bulan + '-' + tanggal;
	} else if (substr(tgl, 4, 1) == '-') { // ini format yyyy-mm-dd
		tahun = substr(tgl, 0, 4);
		bulan = substr(tgl, 5, 2);
		tanggal = substr(tgl, 8, 2);
		waktu = substr(tgl, 11, 8);

		return indo ? tanggal + ' ' + get_bulan(bulan) + ' ' + tahun + ', ' + set_waktu(waktu) : tanggal + '-' + bulan + '-' + tahun;
	}
}

function set_waktu(wkt) {
	jam = substr(wkt, 0, 2);
	menit = substr(wkt, 3, 2);

	if (jam < 12) {
		AMPM = "AM";
		if (jam == 0) jam = 12;
	} else {
		AMPM = "PM";
		if (jam != 12) jam = jam - 12;
	}

	return jam + ':' + menit + ' ' + AMPM;
}

function get_hari(day) {
	switch (parseInt(day)) {
		case 0:
			return "Ahad";
			break;
		case 1:
			return "Senin";
			break;
		case 2:
			return "Selasa";
			break;
		case 3:
			return "Rabu";
			break;
		case 4:
			return "Kamis";
			break;
		case 5:
			return "Jumat";
			break;
		case 6:
			return "Sabtu";
			break;
		default:
			return day;
	}
}

function get_bulan(bln) {
	switch (parseInt(bln)) {
		case 1:
			return "Januari";
			break;
		case 2:
			return "Februari";
			break;
		case 3:
			return "Maret";
			break;
		case 4:
			return "April";
			break;
		case 5:
			return "Mei";
			break;
		case 6:
			return "Juni";
			break;
		case 7:
			return "Juli";
			break;
		case 8:
			return "Agustus";
			break;
		case 9:
			return "September";
			break;
		case 10:
			return "Oktober";
			break;
		case 11:
			return "November";
			break;
		case 12:
			return "Desember";
			break;
		default:
			return bln;
	}
}

function set_price(el, num) {
	$(el).html('= ' + rupiah(num));
}

function rupiah(angka, kurs = '') {
	if (kurs) return kurs + ' ' + (parseInt(angka)).formatMoney(0, '.', ',');
	return 'Rp' + (parseInt(angka)).formatMoney(0, ',', '.') + ',-';
}

Number.prototype.formatMoney = function (c, d, t) {
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
