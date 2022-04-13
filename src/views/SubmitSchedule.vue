<template>
  <v-app>
    <v-container fluid style="width: 600px">
      <div class="mb-5">
      </div>
      <upload-files></upload-files>
    </v-container>
  </v-app>
</template>
<script>
import UploadFiles from "@/components/UploadFiles";
export default {
  name: "SubmitSchedule",
  components: {
    UploadFiles,
  },
};
</script>

<style></style>
