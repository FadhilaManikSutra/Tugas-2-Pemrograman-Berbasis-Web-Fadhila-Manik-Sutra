new Vue({

  el: "#app",

  data: {

    upbjjList: dummyData.upbjjList,

    kategoriList: dummyData.kategoriList,

    stok: dummyData.stok,

    search: "",

    filterUpbjj: "",

    filterKategori: "",

    filterStatus: "",

    sortBy: "",

    showToast: false,

    toastMessage: "",

    form: {

      kode: "",

      judul: "",

      kategori: "",

      upbjj: "",

      lokasiRak: "",

      harga: 0,

      qty: 0,

      safety: 0,

      catatanHTML: ""

    }

  },

  computed: {

    /* ================= FILTER KATEGORI ================= */
    kategoriTersedia() {

      if (!this.filterUpbjj) {
        return this.kategoriList;
      }

      let hasil = this.stok.filter(item =>
        item.upbjj === this.filterUpbjj
      );

      return [...new Set(
        hasil.map(item => item.kategori)
      )];

    },

    /* ================= FILTERED DATA ================= */
    filteredStok() {

      let data = [...this.stok];

      /* SEARCH */
      if (this.search) {

        data = data.filter(item =>
          item.judul.toLowerCase()
          .includes(this.search.toLowerCase())
        );

      }

      /* FILTER UPBJJ */
      if (this.filterUpbjj) {

        data = data.filter(item =>
          item.upbjj === this.filterUpbjj
        );

      }

      /* FILTER KATEGORI */
      if (this.filterKategori) {

        data = data.filter(item =>
          item.kategori === this.filterKategori
        );

      }

      /* FILTER STATUS */
      if (this.filterStatus === "aman") {

        data = data.filter(item =>
          item.qty >= item.safety
        );

      }

      if (this.filterStatus === "menipis") {

        data = data.filter(item =>
          item.qty < item.safety &&
          item.qty > 0
        );

      }

      if (this.filterStatus === "kosong") {

        data = data.filter(item =>
          item.qty === 0
        );

      }

      /* SORT */
      if (this.sortBy === "judul") {

        data.sort((a,b) =>
          a.judul.localeCompare(b.judul)
        );

      }

      if (this.sortBy === "qty") {

        data.sort((a,b) =>
          a.qty - b.qty
        );

      }

      if (this.sortBy === "harga") {

        data.sort((a,b) =>
          a.harga - b.harga
        );

      }

      return data;

    },

    /* ================= STATISTIK ================= */
    totalAman() {

      return this.stok.filter(item =>
        item.qty >= item.safety
      ).length;

    },

    totalMenipis() {

      return this.stok.filter(item =>
        item.qty < item.safety &&
        item.qty > 0
      ).length;

    },

    totalKosong() {

      return this.stok.filter(item =>
        item.qty === 0
      ).length;

    }

  },

  methods: {

    /* ================= RESET FILTER ================= */
    resetFilter() {

      this.search = "";

      this.filterUpbjj = "";

      this.filterKategori = "";

      this.filterStatus = "";

      this.sortBy = "";

    },

    /* ================= TOAST ================= */
    tampilToast(pesan) {

      this.toastMessage = pesan;

      this.showToast = true;

      setTimeout(() => {

        this.showToast = false;

      }, 2000);

    },

    /* ================= TAMBAH DATA ================= */
    tambahData() {

      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj
      ) {

        this.tampilToast(
          "Semua field wajib diisi"
        );

        return;

      }

      this.stok.push({

        kode: this.form.kode,

        judul: this.form.judul,

        kategori: this.form.kategori,

        upbjj: this.form.upbjj,

        lokasiRak: this.form.lokasiRak,

        harga: this.form.harga,

        qty: this.form.qty,

        safety: this.form.safety,

        catatanHTML: this.form.catatanHTML

      });

      this.form = {

        kode: "",

        judul: "",

        kategori: "",

        upbjj: "",

        lokasiRak: "",

        harga: 0,

        qty: 0,

        safety: 0,

        catatanHTML: ""

      };

      this.tampilToast(
        "Data berhasil ditambahkan"
      );

    },

    /* ================= EDIT STOK ================= */
    editStok(index) {

      let qtyBaru = prompt(
        "Masukkan jumlah stok baru",
        this.stok[index].qty
      );

      if (qtyBaru === null) {
        return;
      }

      this.stok[index].qty =
        parseInt(qtyBaru);

      this.tampilToast(
        "Stok berhasil diperbarui"
      );

    }

  },

  watch: {

    /* ================= WATCH FILTER ================= */
    filterUpbjj() {

      this.filterKategori = "";

    },

    /* ================= WATCH QTY ================= */
    "form.qty"(value) {

      if (value < 0) {

        this.form.qty = 0;

      }

    }

  }

});