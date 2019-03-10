<template>
   <v-container fluid>
       <v-layout wrap>
           <v-flex xs12>
               <Timeline v-for="tl in timelineData" :current-time="tl.currentTime"></Timeline>
           </v-flex>
           <v-flex xs12 lg6 offset-lg3 row>
               <v-layout row>
                   <v-combobox
                       @change="changeHandler"
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
import TimeZone from './TimeZone';
import Timeline from './components/Timeline'

export default {
    name: 'App',
    data(){
        return {
            timelineData: [{
                currentTime: DateTime.local().setZone('Europe/London'),
                timeZone: TimeZone.find( tz => tz.zoneName === 'Europe/London' )
            },{
                currentTime: DateTime.local().setZone('Asia/Kolkata'),
                timeZone: TimeZone.find( tz => tz.zoneName === 'Asia/Kolkata' )
            },{
                currentTime: DateTime.local().setZone('America/New_York'),
                timeZone: TimeZone.find( tz => tz.zoneName === 'America/New_York' )
            }],
            timeZones: TimeZone.map( value => value.zoneName )
        }
    },
    components: {
        Timeline
    },
    methods: {
        changeHandler(value){
            console.log(value);
        }
    },
    computed: {}
}
</script>

<style>
.wrapper{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
