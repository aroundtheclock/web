<template>
   <v-container fluid>
       <v-layout wrap>
           <v-flex xs12>
               <Timeline v-for="tl in timelineData" :time="tl"></Timeline>
           </v-flex>
           <v-flex xs12 lg6 offset-lg3 row>
               <v-layout row>
                   <v-combobox
                       v-model="newCountry"
                       :items="timeZones"
                       label="Select Timezone"
                   ></v-combobox>
                   <v-btn color="info" @click="addToList()"> Add Timezone</v-btn>
               </v-layout>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
import DateTime from 'luxon/src/datetime.js'
import TimeZoneNew from './TimeZone2';
import Timeline from './components/Timeline'

export default {
    name: 'App',
    data(){
        return {
            countries: TimeZoneNew.countries,
            zones: TimeZoneNew.zones,
            timelineData: [],
            timeZones: Object.keys(TimeZoneNew.zones).map( value => value ),
            newCountry: null
        }
    },
    components: {
        Timeline
    },
    methods: {
        setTime(){
            this.timelineData.forEach( country => {
                country.currentTime = DateTime.local().setZone(country.zoneName)
            });
        },
        addToList(country){
            const time = DateTime.local().setZone(country || this.newCountry);
            this.timelineData.push(time);
            this.newCountry = null;
        }
    },
    mounted(){
        ['Europe/Istanbul', 'Asia/Kolkata', 'America/Toronto'].forEach( country => this.addToList(country));
        setInterval(()=>{
            this.setTime();
        },3000)
    }
}
</script>

<style>
    .container{
        padding: 10px;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>
