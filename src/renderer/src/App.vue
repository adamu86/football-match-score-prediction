<script setup lang="ts">
import { Button, InputText } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Divider from 'primevue/divider';
import { ref } from 'vue';
import Select from 'primevue/select';

const apiUrl = ref('http://127.0.0.1:8000/predict');
// const apiToken = ref(' // token tutaj do API // ');
const homeTeam = ref<{ name: string }>();
const awayTeam = ref<{ name: string }>();
const allTeams = [
  { name: "Liverpool" },
  { name: "Bournemouth" },
  { name: "Aston Villa" },
  { name: "Newcastle" },
  { name: "Brighton" },
  { name: "Fulham" },
  { name: "Sunderland" },
  { name: "West Ham" },
  { name: "Tottenham" },
  { name: "Burnley" },
  { name: "Wolves" },
  { name: "Man City" },
  { name: "Chelsea" },
  { name: "Crystal Palace" },
  { name: "Nott'm Forest" },
  { name: "Brentford" },
  { name: "Man United" },
  { name: "Arsenal" },
  { name: "Leeds" },
  { name: "Everton" },
  { name: "West Ham" },
  { name: "Chelsea" }
];

const scores = ref<{ 
  homeTeam: string, 
  awayTeam: string, 
  homeWin: number,
  awayWin: number,
  draw: number,
}[]>([]);

const predictScore = async () => {
  if (homeTeam.value && awayTeam.value) {
    const res = await window.electron.ipcRenderer.invoke(
      'get-prediction', 
      apiUrl.value, 
      { 
        homeTeam: homeTeam.value.name,
        awayTeam: awayTeam.value.name 
      }
    );

    if (res) {
      scores.value.unshift({
        homeTeam: res.home,
        awayTeam: res.away,
        homeWin: Math.floor(res.probabilities.home_win * 1000) / 1000,
        awayWin: Math.floor(res.probabilities.away_win * 1000) / 1000,
        draw: Math.floor(res.probabilities.draw * 1000) / 1000,
      });
    }
  }
}
</script>

<template>
  <div class="grid gap-2 m-2">
    <div class="flex gap-2">
      <InputText size="small" v-model="apiUrl" class="w-full" placeholder="API URL..." />
      <!-- <InputText size="small" v-model="apiToken" class="w-full" placeholder="API Token..." /> -->
    </div>
    <Panel>
      <div class="grid grid-cols-[1fr_auto_auto_auto_1fr] gap-2">
        <div class="flex flex-col gap-2">
          <label class="font-bold mx-auto text-lg">Home Team</label>
          <Select size="large" v-model="homeTeam" filter :options="allTeams.filter(el => el.name !== awayTeam?.name)" optionLabel="name" placeholder="First team name... " class="w-full" />
        </div>
        <Divider layout="vertical" />
        <div class="grid gap-2">
          <Button class="w-full" size="large" label="Prediction" @click="predictScore" />
        </div>
        <Divider layout="vertical" />
        <div class="flex flex-col gap-2">
          <label class="font-bold mx-auto text-lg">Away Team</label>
          <Select size="large" v-model="awayTeam" filter :options="allTeams.filter(el => el.name !== homeTeam?.name)" optionLabel="name" placeholder="First team name... " class="w-full" />
        </div>
      </div> 
    </Panel>
    <Panel header="Predicted probabilities" class="flex flex-column h-118">
      <DataTable columnResizeMode="expand" scrollable scrollHeight="100%" :value="scores" size="large" showGridlines paginator :rows="5" removableSort>
        <Column :style="{ textAlign: 'center' }" field="homeTeam" header="Home Team" sortable class="w-1/5" />
        <Column :style="{ textAlign: 'center' }" field="homeWin" header="Home Win Prob" class="w-1/5" />
        <Column :style="{ textAlign: 'center' }" field="draw" header="Draw Prob" class="w-1/5" />
        <Column :style="{ textAlign: 'center' }" field="awayWin" header="Away Win Prob" class="w-1/5" />
        <Column :style="{ textAlign: 'center' }" field="awayTeam" header="Away Team" sortable class="w-1/5" />
      </DataTable>
    </Panel>
  </div>
</template>
