<script setup lang="ts">
import { Button, InputText } from 'primevue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Divider from 'primevue/divider';
import { ref } from 'vue';
import { getScoreByTeam } from './api/api';

const teamName = ref('');

const teamScores = ref<{teamName: string, predictedScore: number}[]>([]);

const predictScore = async () => {
  if (teamName.value.length > 0) {
    teamScores.value.unshift({
      teamName: teamName.value,
      predictedScore: Math.floor(Math.random() * 100)
    });

    // const res = await getScoreByTeam(teamName.value);

    // if (res) {
    //   teamScores.value.unshift({
    //     teamName: teamName.value,
    //     predictedScore: res.predictedScore
    //   });
    // }
  };
}
</script>

<template>
  <Toast />
  <div class="grid gap-2 m-2">
    <Panel header="Prediction">
      <div class="grid grid-cols-[1fr_auto_min-content] gap-2">
        <div class="grid gap-2">
          <InputText v-model="teamName" placeholder="Team name..." />
          <Button label="Predict" @click="predictScore"/>
        </div>
        <Divider layout="vertical" />
        <div class="grid gap-2">
          <label class="font-bold mx-auto text-lg">Score</label>
          <InputText class="pointer-events-none text-lg! text-center" :placeholder="teamScores[0]?.predictedScore.toString() || 'Predicted score...'"/>
        </div>
      </div> 
    </Panel>
    <Panel header="Matches scores table" class="flex flex-column h-118">
      <DataTable columnResizeMode="expand" scrollable scrollHeight="100%" :value="teamScores" size="large" showGridlines paginator :rows="5" removableSort>
        <Column field="teamName" header="Team Name" sortable style="width: 50%;" />
        <Column field="predictedScore" header="Predicted Score" sortable style="width: 50%"/>
      </DataTable>
    </Panel>
  </div>
</template>
