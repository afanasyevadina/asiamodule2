<template>
  <div class="home">
    <form action="#" autocomplete="off">
      <div class="form-group">
        <label for="staff">Employee's name</label>
        <input type="text" v-model="filters.staff" id="staff" />
      </div>
      <div class="form-group">
        <label for="point">Control point</label>
        <input type="text" v-model="filters.point" id="point" />
      </div>
      <div class="form-group">
        <label for="access">Accesses</label>
        <select v-model="filters.access" id="access">
          <option :value="null">All</option>
          <option :value="true">Allowed</option>
          <option :value="false">Prohibited</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" v-model="filters.date" id="date" />
      </div>
    </form>
    <div v-for="(items, day) in logsPerDay" :key="day">
      <h3>
        {{
          day ==
          new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
            ? "Today"
            : day
        }}
      </h3>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Name</th>
            <th>Point</th>
            <th>Access</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in items.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)" :key="log.id">
            <td>{{ new Date(log.timestamp * 1000).toLocaleTimeString() }}</td>
            <td>{{ log.staff }}</td>
            <td>{{ log.point }}</td>
            <td>
              <div v-if="log.access">Allowed</div>
              <div v-else>Prohibited</div>
            </td>
            <td>
              <a :href="log.photo">View Images</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signuin",
  data() {
    return {
      logs: [],
      filters: {
        staff: "",
        point: "",
        access: null,
        date: null,
      },
    };
  },
  computed: {
    filteredLogs: function () {
      return this.logs
        .filter(
          (log) =>
            !this.filters.staff ||
            log.staff.toLowerCase().includes(this.filters.staff.toLowerCase())
        )
        .filter(
          (log) =>
            !this.filters.point ||
            log.point.toLowerCase().includes(this.filters.point.toLowerCase())
        )
        .filter(
          (log) =>
            this.filters.access === null || log.access == this.filters.access
        )
        .filter(
          (log) =>
            !this.filters.date ||
            new Date(log.timestamp * 1000).toLocaleDateString() ==
              new Date(this.filters.date).toLocaleDateString()
        );
    },
    logsPerDay: function () {
      return this.filteredLogs.reduce((a, c) => {
        let day = new Date(c.timestamp * 1000).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        (a[day] = a[day] || []).push(c);
        return a;
      }, {});
    },
  },
  methods: {
    loadLogs: function () {
      this.errors = [];
      fetch("http://laravel/api/logs", {
        headers: {
          Authorization: `Bearer ${this.$parent.user.token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.logs = json.data.items;
        });
    },
  },
  mounted() {
    this.loadLogs();
  },
};
</script>
