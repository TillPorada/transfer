<template>
  <div>
    
    <v-expansion-panels>
      <v-expansion-panel
        v-for="amn in 
          amnList" 
        :key="amn.id"
      >
        <v-expansion-panel-title disable-icon-rotate>
          <div class="amn-details">
            <img 
              :src="amn.sprite"
              alt="amn Image" 
              style="width: 32px; 
              height: 32px; 
              margin-right: 10px;
              display: flex;"
            >
            <p style="margin-bottom: 10px;">{{ amn.name }}</p>
          </div>
          <template v-slot:actions>
            <v-icon
              color="warning"
              icon="mdi-arrow-down-circle"
              style="margin-right: 10px"
            />
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <p>{{ amn.description }}</p>
          <div style="margin-top: 20px">
            Add {{ amn.name }} to Modeler
            <v-icon 
                    color="warning" 
                    icon="mdi-plus" 
                    @click="addAMN"
            />
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface amn {
  id: number;
  name: string;
  description: string;
  url: string;
  sprite: string;
}

const amnList = ref<amn[]>([]);

const fetchamnList = async () => {
  try {
    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0'
    );
    amnList.value = response.data.results.map((amn: any, index: number) => ({
      id: index + 1,
      name: amn.name,
      url: amn.url,
      description: `Description for ${amn.name}`,
      sprite: "", // Initialize sprites object
    }));

    // Fetch sprite data for each amn
    await Promise.all(
      amnList.value.map(async (amn) => {
        const spriteResponse = await axios.get(amn.url);
        amn.sprite = spriteResponse.data.sprites.front_default;
      })
    );
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon-Liste", error);
  }
};

function addAMN() {
  console.log("AMN Added to Modeler");
}

onMounted(fetchamnList);
</script>

<style scoped>
.amn-details {
  display: flex;
  align-items: center;
}
</style>
