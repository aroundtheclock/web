<template>
   <v-container fluid>
       <v-layout wrap>
           <v-flex xs12>
               <Timeline v-for="tl in timelineData" :time="tl"></Timeline>
           </v-flex>
           <v-flex xs12 lg2 offset-lg10 row>
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
import TimeZone from './TimeZone2';
import Timeline from './components/Timeline'

export default {
    name: 'App',
    data(){
        return {
            countries: TimeZone.countries,
            zones: TimeZone.zones,
            timelineData: [],
            timeZones: Object.keys(TimeZone.zones).map( value => value ),
            newCountry: null
        }
    },
    components: {
        Timeline
    },
    methods: {
        setTime(){
            this.timelineData = this.timelineData.map( country => {
                console.log(country);
                console.log(DateTime.local().setZone(country.zoneName));
                return DateTime.local().setZone(country.zoneName)
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
        },60000)
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
