<script setup lang="ts">
import { Button, InputText } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Divider from 'primevue/divider';
import { onMounted, ref } from 'vue';
import Select from 'primevue/select';
import { getTeamsList } from './api/api';

const apiUrl = ref('http://localhost:8080/score-prediction');
const firstTeam = ref();
const secondTeam = ref();
const allTeams = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((el) => ({ name: el })));

const scores = ref<{firstTeam: string, predictedScore: string, secondTeam: string}[]>([]);

const error = ref(false);

const predictScore = async () => {
  if (firstTeam.value && secondTeam.value) {
    scores.value.unshift({
      firstTeam: firstTeam.value.name,
      predictedScore: Math.floor(Math.random() * 5) + "-" + Math.floor(Math.random() * 5),
      secondTeam: secondTeam.value.name,
    });

    // const res = await getScoreByTeam(apiUrl.value, { firstTeam: firstTeam.value.name, secondTeam: secondTeam.value.name });

    // if (res) {
    //   scores.value.unshift({
    //     firstTeam: firstTeam.value.name,
    //     predictedScore: res.predictedScore,
    //     secondTeam: secondTeam.value.name,
    //   });

    //   error.value = false;
    // } else {
    //   error.value = true;
    // }
  };
}
</script>

<template>
  <div class="grid gap-2 m-2">
    <InputText size="small" :invalid="error" v-model="apiUrl" class="w-full" placeholder="API URL..." />
    <Panel>
      <div class="grid grid-cols-[1fr_auto_auto_auto_1fr] gap-2">
        <div class="flex flex-col gap-2">
          <label class="font-bold mx-auto text-lg">First team</label>
          <Select size="large" v-model="firstTeam" filter :options="allTeams.filter((el) => el !== secondTeam)" optionLabel="name" placeholder="First team name... " class="w-full" />
        </div>
        <Divider layout="vertical" />
        <div class="grid gap-2">
          <label class="font-bold mx-auto text-lg">Predicted Score</label>
          <InputText size="large" class="pointer-events-none text-lg! text-center" :placeholder="scores[0]?.predictedScore.toString() || 'Predicted score...'"/>
          <Button class="w-full" label="Predict score" @click="predictScore" />
        </div>
        <Divider layout="vertical" />
        <div class="flex flex-col gap-2">
          <label class="font-bold mx-auto text-lg">Second team</label>
          <Select size="large" v-model="secondTeam" filter :options="allTeams.filter((el) => el !== firstTeam)" optionLabel="name" placeholder="First team name... " class="w-full" />
        </div>
      </div> 
    </Panel>
    <Panel header="Predicted scores table" class="flex flex-column h-118">
      <DataTable columnResizeMode="expand" scrollable scrollHeight="100%" :value="scores" size="large" showGridlines paginator :rows="5" removableSort>
        <Column :style="{ textAlign: 'center' }" field="firstTeam" header="First Team" sortable class="w-1/3" />
        <Column :style="{ textAlign: 'center' }" field="predictedScore" header="Predicted Score" sortable class="w-1/3" />
        <Column :style="{ textAlign: 'center' }" field="secondTeam" header="Second Team" sortable class="w-1/3" />
      </DataTable>
    </Panel>
  </div>
</template>
