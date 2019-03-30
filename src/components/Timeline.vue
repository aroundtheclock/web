<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex sm12 xs12 lg2>
                <span class="country-name">{{ time.zoneName }}</span>
            </v-flex>
            <v-flex sm12 xs12 lg10 row class="timeline-wrapper">
                <div v-movable="moveProp" v-resizable class="meeting-handler" ref="meetingHandler"></div>
                <div class="timeline">
                    <div class="hour" :class="getBackgroundClass(hour-1)" v-for="hour in 24" :key="hour">
                        <span class="time-pointer" v-if="isCurrentHour(hour-1)" :style="{ 'left': calculatePointerLeft }">
                            <span>{{ time.toFormat('hh:mm a') }}</span>
                        </span>
                        <span class="hour-label hidden-sm-and-down">{{ getTime(hour-1).toFormat('h:ma') }}</span>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import { Resizable, Movable } from '../directives';

    export default {
        name: 'Timeline',
        props: {
            time:{
                type: Object
            }
        },
        directives:{
            Resizable,
            Movable
        },
        data(){
            return {
                moveProp: null
            }
        },
        mounted(){
            this.moveProp = {
                width:  document.querySelector('.hour').offsetWidth
            }
        },
        methods: {
            getTime(hours){
                return this.time.set({ hours: this.offsetHours + (hours), minutes: this.offsetMinutes })
            },
            isCurrentHour(hour){
                return this.blockHour(hour) === this.currentHours;
            },
            getBackgroundClass(hour){
                const blockHour = this.getTime(hour).toFormat('HH');

                if(blockHour > 20 || blockHour < 6){
                    return 'night';
                } else if(blockHour < 9 ) {
                    return 'early-morning';
                } else if( blockHour > 17 ){
                    return 'evening';
                } else {
                    return 'day';
                }
            },
            blockHour(hour){
                return parseInt(this.getTime(hour).toFormat('HH'));
            }
        },
        computed: {
            offsetHours(){
                return parseInt(this.time.offset / 60);
            },
            offsetMinutes(){
                return parseInt(this.time.offset % 60);
            },
            currentHours(){
                return parseInt(this.time.toFormat('HH'));
            },
            currentMinutes(){
                return parseInt(this.time.toFormat('m'));
            },
            calculatePointerLeft(){
                return `${(this.currentMinutes - this.offsetMinutes) * 1.67}%`;
            },
        }
    }
</script>
<style>
    .timeline-wrapper{
        position: relative;
    }
    .timeline{
        height:50px;
        /*border: 1px solid #cdcdcd;*/
        display: flex;
        border-radius: 5px;
        box-shadow: 0 2px 7px 0 rgba(0,0,0,.3)
    }
    .hour{
        flex: 1 1 0;
        position: relative;
    }
    .hour:before{
        content: '';
        top: 0;
        width: 1px;
        border-left: 1px solid #cdcdcd;
        position: absolute;
        left: 0;
        height: 15px;
    }
    .hour:first-child{
        -webkit-border-radius: 4px 0 0 4px;
        -moz-border-radius: 4px 0 0 4px;
        border-radius: 4px 0 0 4px;
    }
    .hour:last-child{
        -webkit-border-radius: 0 4px 4px 0;
        -moz-border-radius: 0 4px 4px 0;
        border-radius: 0 4px 4px 0;
    }
    .hour:first-child:before{
        border-left: 0 solid #cdcdcd;
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
    .time-pointer{
        position: absolute;
        height: 100%;
        width: 1px;
        border-left: 1px solid red;
    }
    .time-pointer span {
        position: absolute;
        top: -16px;
        left: -30px;
        width: 65px;
        color: #4d4d4d;
        font-size: 14px;
        font-family: sans-serif;
    }
    .meeting-handler{
        border: 2px solid #000;
        height: 100%;
        position: absolute;
        width: 4%;
        padding: 10px;
        touch-action: none;
        z-index: 1;
    }
    .meeting-handler-inner{
        flex: 1 1 auto;
    }
    .hour.night {
        background: #4d4d4d;
        color: #d4d4d4;
    }
    .hour.evening, .hour.early-morning{
        background: #d3e4ea;
        color: #4d4d4d;
    }
    .hour.day{
        background: #efefef;
        color: #4d4d4d;
    }

</style>
