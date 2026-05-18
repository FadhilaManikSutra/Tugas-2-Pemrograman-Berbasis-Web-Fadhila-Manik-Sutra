new Vue({
  el: "#app",

  data: {
    pengirimanList: [
      { kode: "REG", nama: "JNE Regular (3-5 hari)" },
      { kode: "EXP", nama: "JNE Express (1-2 hari)" }
    ],

    paket: [
      {
        kode: "PAKET-UT-001",
        nama: "PAKET IPS Dasar",
        isi: ["EKMA4116", "EKMA4115"],
        harga: 120000
      },
      {
        kode: "PAKET-UT-002",
        nama: "PAKET IPA Dasar",
        isi: ["BIOL4201", "FISIP4001"],
        harga: 140000
      }
    ],

    tracking: {
      "DO2025-0001": {
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE Regular (3-5 hari)",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
          {
            waktu: "2025-08-25 10:12:20",
            keterangan: "Penerimaan di Loket: TANGSEL"
          },
          {
            waktu: "2025-08-25 14:07:56",
            keterangan: "Tiba di Hub: JAKSEL"
          },
          {
            waktu: "2025-08-26 08:44:01",
            keterangan: "Diteruskan ke Kantor Tujuan"
          }
        ]
      }
    },

    form: {
      nomorDO: "",
      nim: "",
      nama: "",
      ekspedisi: "",
      paket: "",
      tanggalKirim: "",
      total: 0
    },

    selectedTracking: null,

    errors: {},

    autoStatus: "Diproses"
  },

  computed: {
    paketDipilih() {
      return this.paket.find(
        item => item.kode === this.form.paket
      );
    },

    trackingList() {
      return Object.entries(this.tracking).map(([key, value]) => {
        return {
          nomorDO: key,
          ...value
        };
      });
    }
  },

  watch: {
    "form.paket"(newValue) {
      const selected = this.paket.find(
        item => item.kode === newValue
      );

      if (selected) {
        this.form.total = selected.harga;
      } else {
        this.form.total = 0;
      }
    },

    "form.nama"(value) {
      if (value.length > 0 && value.length < 3) {
        this.errors.nama =
          "Nama minimal 3 karakter";
      } else {
        this.errors.nama = "";
      }
    }
  },

  methods: {
    generateNomorDO() {
      const year = new Date().getFullYear();

      const totalDO =
        Object.keys(this.tracking).length + 1;

      const sequence = String(totalDO).padStart(3, "0");

      return `DO${year}-${sequence}`;
    },

    tambahTracking() {
      this.errors = {};

      if (!this.form.nim) {
        this.errors.nim = "NIM wajib diisi";
      }

      if (!this.form.nama) {
        this.errors.nama = "Nama wajib diisi";
      }

      if (!this.form.ekspedisi) {
        this.errors.ekspedisi =
          "Ekspedisi wajib dipilih";
      }

      if (!this.form.paket) {
        this.errors.paket =
          "Paket wajib dipilih";
      }

      if (
        Object.values(this.errors).some(
          item => item !== ""
        )
      ) {
        return;
      }

      const nomorBaru = this.generateNomorDO();

      this.tracking[nomorBaru] = {
        nim: this.form.nim,
        nama: this.form.nama,
        status: this.autoStatus,
        ekspedisi: this.form.ekspedisi,
        tanggalKirim:
          this.form.tanggalKirim ||
          new Date().toISOString().split("T")[0],
        paket: this.form.paket,
        total: this.form.total,

        perjalanan: [
          {
            waktu: new Date().toLocaleString(),
            keterangan:
              "Data pengiriman berhasil dibuat"
          }
        ]
      };

      this.form = {
        nomorDO: "",
        nim: "",
        nama: "",
        ekspedisi: "",
        paket: "",
        tanggalKirim: "",
        total: 0
      };

      alert("Tracking DO berhasil ditambahkan");
    },

    lihatDetail(item) {
      this.selectedTracking = item;
    },

    getStatusClass(status) {
      if (status === "Dalam Perjalanan") {
        return "status-warning";
      }

      if (status === "Diproses") {
        return "status-info";
      }

      if (status === "Selesai") {
        return "status-safe";
      }

      return "status-danger";
    },

    formatRupiah(angka) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(angka);
    }
  },

  mounted() {
    this.form.nomorDO = this.generateNomorDO();
  }
});