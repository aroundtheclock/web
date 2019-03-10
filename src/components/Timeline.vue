<template>
    <v-container fluid>
        <v-layout row>
            <v-flex>
                <span>{{ label }}</span>
            </v-flex>
            <v-flex xs12 lg11 row>
                <div class="timeline">
                    <div class="hour" v-for="hour in 25" :key="hour">
                        <span class="time-pointer" v-if="isCurrentHour(hour)" :style="{ 'marginLeft': calculatePointerLeft }"></span>
                        <span class="hour-label" >{{ getTime(hour) }}</span>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'Timeline',
    props: {
        label:{
            type: String
        },
        currentTime:{
            type: Object
        }
    },
    data(){
        return {}
    },
    methods: {
        getTime(hours){
            return this.currentTime.set({ hours: this.offsetHours + (hours-1), minutes: this.offsetMinutes }).toFormat('h:ma')
        },
        isCurrentHour(hour){
            console.log(this.currentHours)
            return ((this.offsetHours + (hour-1)) % 12) === this.currentHours % 12;
        }
    },
    computed: {
        offsetHours(){
            return parseInt(this.currentTime.offset / 60);
        },
        offsetMinutes(){
            return parseInt(this.currentTime.offset % 60);
        },
        currentHours(){
            return parseInt(this.currentTime.toFormat('h'));
        },
        currentMinutes(){
            return parseInt(this.currentTime.toFormat('m'));
        },
        calculatePointerLeft(){
            return `${(this.currentMinutes - this.offsetMinutes) * 1.67}%`;
        }
    }
}
</script>
<style>
    .timeline{
        height:50px;
        border: 1px solid #cdcdcd;
        display: flex;
        border-radius: 5px;
    }
    .hour{
        flex: 1 1 0;
        position: relative;
    }
    .hour:before{
        content: '';
        height: 100%;
        width: 1px;
        border-left: 1px solid #cdcdcd;
    }
    .hour:first-child:before{
        border-left: 0px solid #cdcdcd;
    }
    .hour-label{
        font-family: Roboto, sans-serif;
        font-size: 10px;
        padding: 5px;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        z-index: 1;
    }
    .hour:last-child{
        min-width: 0;
        padding: 0;
        flex-grow: 0;
    }
    .hour:last-child .hour-label{
        display: none;
    }
    .time-pointer{
        position: relative;
        height: 100px;
        width: 1px;
        border-left: 1px solid red;
    }
</style>
