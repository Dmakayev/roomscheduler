<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="faculty"
      :search="search"
      :sort-by.sync="sortBy"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>UND Contacts</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="primary" dark x-small class="mr-2" @click="clearSearch">
            Clear Search
          </v-btn>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            clearable
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mr-2" v-bind="attrs" v-on="on">
                Add Contact
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.lastName"
                        :rules="[rules.required]"
                        label="Last Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.firstName"
                        :rules="[rules.required]"
                        label="First Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        :rules="[rules.required, rules.email]"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.phone"
                        :rules="[rules.required]"
                        label="Phone Number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.department"
                        :rules="[rules.required]"
                        label="Department"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.title"
                        :rules="[rules.required]"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn
                  :disabled="!formIsValid"
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
        <v-icon small class="mr-2" @click="copyEmail(item)">
          mdi-content-copy
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      sortBy: "lastName",
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: "Last Name",
          align: "start",
          sortable: false,
          value: "lastName",
        },
        { text: "First Name", value: "firstName" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
        { text: "Phone", value: "phone" },
        { text: "Department", value: "department" },
        { text: "Title", value: "title" },
      ],
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      faculty: [],
      editedIndex: -1,
      editedItem: {
        lastName: "",
        id: "",
        firstName: "",
        email: "",
        actions: "",
        phone: "",
        department: "",
        title: "",
      },
      defaultItem: {
        lastName: "",
        id: "",
        firstName: "",
        email: "",
        actions: "",
        phone: "",
        department: "",
        title: "",
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    formIsValid() {
      return (
        this.editedItem.lastName &&
        this.editedItem.firstName &&
        this.editedItem.email &&
        this.editedItem.phone &&
        this.editedItem.department &&
        this.editedItem.title
      );
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    getFacultyData() {
      axios.get("http://127.0.0.1:8000/FacultyNames").then((response) => {
        this.faculty = response.data;
      });
    },
    copyEmail(item) {
      console.log(item.email);
      navigator.clipboard.writeText(item.email);
    },
    clearSearch() {
      this.search = "";
    },
    initialize() {},

    editItem(item) {
      this.editedIndex = this.faculty.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.faculty.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.faculty.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      axios
        .delete("http://127.0.0.1:8000/FacultyNames/" + this.editedItem.id)
        .then(() => {
          this.getFacultyData();
        });
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.faculty[this.editedIndex], this.editedItem);
        axios
          .put("http://127.0.0.1:8000/FacultyNames/" + this.editedItem.id, {
            lastName: this.editedItem.lastName,
            firstName: this.editedItem.firstName,
            email: this.editedItem.email,
            phone: this.editedItem.phone,
            department: this.editedItem.department,
            title: this.editedItem.title,
          })
          .then(() => {
            this.getFacultyData();
          });
      } else {
        axios
          .post("http://127.0.0.1:8000/FacultyNames", {
            lastName: this.editedItem.lastName,
            firstName: this.editedItem.firstName,
            email: this.editedItem.email,
            phone: this.editedItem.phone,
            department: this.editedItem.department,
            title: this.editedItem.title,
          })
          .then(() => {
            this.getFacultyData();
          });
        this.faculty.push(this.editedItem);
      }
      this.close();
    },
  },
  mounted() {
    this.getFacultyData();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
