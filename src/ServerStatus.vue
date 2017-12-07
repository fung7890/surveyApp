<style>


.question{
  font-size: 40px;
}

.score{
  font-size: 50px;
}
</style>



<template >
  <b-container>
    <b-row>
      <b-col>
    <div class="text-center">

    <div id="app">
    <div class="container">
      <div class="Chart__list">
        <div class="Chart">

          <div v-if="currentPage===quiz.examples.length+1">
          <h2 >Results</h2>

          <p1 class="score">Overall Score {{overAllScore}} / 7</p1>
          <br><br>

          <bar-chart v-if="this.total.length > 9" :data="{labels: ['Aesthetics', 'Dynamics' ], datasets:[{    // checking total's length accounts for async
            label: '',
            backgroundColor: ['#5cb85c','#8B008B'],
            data: this.aestheticsDynamics },


            ]}"
            :width="400"
            :height="200">
          </bar-chart>
          <br><br><br>

          <bar-chart v-if="this.total.length > 9" :data="{labels: ['Meaning', 'Mastery','Curiosity','Immersion','Autonomy',
            'Goals & Rules','Audiovisual Appeal','Challenge','Ease-of-Control','Progress Feedback' ], datasets:[{
            label: '',
            backgroundColor: ['#f87979', '#d9534f', '#5bc0de','#5cb85c','#8B008B','#f87979', '#d9534f', '#5bc0de','#5cb85c','#8B008B'],
            data: this.total },]}">
          </bar-chart>

          </div>
        </div>
      </div>
    </div>
  </div>


        <b-progress v-if ="currentPage >= 0 && currentPage < 36" :value="currentPage" :max="35" variant="success"></b-progress>
        <br>
        <!-- index is current index of the questions, responses is an array, using responses[index] will allow unique reference in that array -->
        <div v-for="(question, index) in quiz.examples">
            <div v-if="index === currentPage">
                <p class="question text-center">{{question.text}}</p>
                <form class = "text-center">
                    <br><br>
                    <b-form-radio-group id="radios2" v-model="responses[index]" name="radioSubComponent" size="xl">
                        <b-form-radio v-bind:value = "[1, question.text, question.category]"> 1  </b-form-radio>
                        <b-form-radio v-bind:value= "[2, question.text, question.category]"> 2  </b-form-radio>
                        <b-form-radio v-bind:value= "[3, question.text, question.category]"> 3  </b-form-radio>
                        <b-form-radio v-bind:value= "[4, question.text, question.category]"> 4  </b-form-radio>
                        <b-form-radio v-bind:value= "[5, question.text, question.category]"> 5  </b-form-radio>
                        <b-form-radio v-bind:value= "[6, question.text, question.category]"> 6  </b-form-radio>
                        <b-form-radio v-bind:value= "[7, question.text, question.category]"> 7  </b-form-radio>

                    </b-form-radio-group>
                </form>
            </div>
        </div>




        <br>

        <span v-if ="currentPage < quiz.examples.length">
            <b-button v-on:click="currentPage++" variant="success" size="lg" >Next</b-button>
            <!-- <p>Current question: {{ currentPage + 1}}</p>
            <p>Length of quiz: {{quiz.examples.length}} questions</p> -->
        </span>
        <br><br>
        <div  v-if ="currentPage > 0 && currentPage < 36">
            <b-button v-on:click="currentPage--"size="sm" >Back</b-button>
        </div>


        <hr>
        <div v-if="currentPage === quiz.examples.length">
                <b-button v-on:click="handler" variant="success" size="lg">Submit</b-button>
            </div>


    </div>
  </b-col>
  </b-row>
  </b-container>

</template>


<script>
import BarChart from './newChart.js'

import * as firebase from 'firebase'




// quiz data
var quiz = {

    examples: [

    {   text: "Playing the game was meaningful to me.", options: [1,2,3,4,5,6,7], category: "Meaning"},
    {   text: "Playing this game was valuable to me.", options: [1,2,3,4,5,6,7], category: "Meaning"},
    {   text: "The game felt relevant to me.", options: [1,2,3,4,5,6,7], category: "Meaning"},
    {   text: "I felt I was good at playing this game.", options: [1,2,3,4,5,6,7], category: "Mastery"},
    {   text: "I felt capable while playing the game.", options: [1,2,3,4,5,6,7], category: "Mastery"},
    {   text: "I felt a sense of mastery playing this game.", options: [1,2,3,4,5,6,7], category: "Mastery"},
    {   text: "I felt a sense of accomplishment playing this game.", options: [1,2,3,4,5,6,7], category: "Mastery"},
    {   text: "I wanted to explore how the game evolved.", options: [1,2,3,4,5,6,7], category: "Curiosity"},
    {   text: "I felt eager to discover how the game continued.", options: [1,2,3,4,5,6,7], category: "Curiosity"},
    {   text: "I wanted to find out how the game progressed.", options: [1,2,3,4,5,6,7], category: "Curiosity"},
    {   text: "I was driven to discover more in the game.", options: [1,2,3,4,5,6,7], category: "Curiosity"},
    {   text: "I was no longer aware of my surroundings while I was playing.", options: [1,2,3,4,5,6,7], category: "Immersion"},
    {   text: "I was immersed in the game.", options: [1,2,3,4,5,6,7], category: "Immersion"},
    {   text: "I was absorbed by the gameplay.", options: [1,2,3,4,5,6,7], category: "Immersion"},
    {   text: "I was fully focused on the game.", options: [1,2,3,4,5,6,7], category: "Immersion"},
    {   text: "I felt free to play the game in my own way.", options: [1,2,3,4,5,6,7], category: "Autonomy"},
    {   text: "I felt like I had choices regarding how I wanted to play this game.", options: [1,2,3,4,5,6,7], category: "Autonomy"},
    {   text: "I felt a sense of freedom about how I wanted to play this game.", options: [1,2,3,4,5,6,7], category: "Autonomy"},
    {   text: "I understood the objectives of the game.", options: [1,2,3,4,5,6,7], category: "Goals and Rules"},
    {   text: "I grasped the overall goal of the game.", options: [1,2,3,4,5,6,7], category: "Goals and Rules"},
    {   text: "The goals of the game were clear to me.", options: [1,2,3,4,5,6,7], category: "Goals and Rules"},
    {   text: "The rules of the game were clear to me.", options: [1,2,3,4,5,6,7], category: "Goals and Rules"},
    {   text: "I enjoyed the way the game was styled.", options: [1,2,3,4,5,6,7], category: "Audiovisual Appeal"},
    {   text: "I liked the look and feel of the game.", options: [1,2,3,4,5,6,7], category: "Audiovisual Appeal"},
    {   text: "I appreciated the aesthetics of the game.", options: [1,2,3,4,5,6,7], category: "Audiovisual Appeal"},
    {   text: "The game was not too easy and not too hard to play.", options: [1,2,3,4,5,6,7], category: "Challenge"},
    {   text: "The game was challenging but not too challenging.", options: [1,2,3,4,5,6,7], category: "Challenge"},
    {   text: "The challenges in the game were at the right level of difficulty for me.", options: [1,2,3,4,5,6,7], category: "Challenge"},
    {   text: "It was easy to know how to perform actions in the game.", options: [1,2,3,4,5,6,7], category: "Ease-of-Control"},
    {   text: "The actions to control the game were clear to me.", options: [1,2,3,4,5,6,7], category: "Ease-of-Control"},
    {   text: "I thought the game was easy to control.", options: [1,2,3,4,5,6,7], category: "Ease-of-Control"},
    {   text: "I quickly grasped how to perform in-game actions.", options: [1,2,3,4,5,6,7], category: "Ease-of-Control"},
    {   text: "The game informed me of my progress in the game.", options: [1,2,3,4,5,6,7], category: "Progress Feedback"},
    {   text: "The game gave clear feedback on my progress towards the goals.", options: [1,2,3,4,5,6,7], category: "Progress Feedback"},
    {   text: "I could easily assess how I was performing in the game.", options: [1,2,3,4,5,6,7], category: "Progress Feedback"},
  ]
};

// function

export default {


  name: 'app',
  components: {
    BarChart
  },

  data: function(){
    return{
        currentPage: 0,
        quiz: quiz,
        responses:[],

        meaning:[],
        mastery:[],
        curiosity:[],
        immersion:[],
        autonomy:[],
        goals:[],
        audioVisual:[],
        challenge:[],
        ease:[],
        progress:[],

        total:[],
        aestheticsDynamics:[],
        aestheticsScore: 0,
        dynamicsScore: 0,
        overAllScore: 0,


        styleObj: {
          fontSize: '30px',
        }


      }
  },


  methods:{

      submit(){
        firebase.database().ref('results').push(this.responses)
            .then((data) => {
                console.log(data)
            })
      },
      updateScore(){

        var aeDenominator = 0;
        var dyDenominator = 0;

        for (var i = 0; i < this.responses.length; i++){

          if (this.responses[i] !== undefined){

            switch(this.responses[i][2]){

            case "Meaning":
                this.meaning.push(this.responses[i][0]);
                break;
            case "Mastery":
                this.mastery.push(this.responses[i][0]);
                break;
            case "Curiosity":
                this.curiosity.push(this.responses[i][0]);
                break;
            case "Immersion":
                this.immersion.push(this.responses[i][0]);
                break;
            case "Autonomy":
                this.autonomy.push(this.responses[i][0]);
                break;
            case "Goals and Rules":
                this.goals.push(this.responses[i][0]);
                break;
            case "Audiovisual Appeal":
                this.audioVisual.push(this.responses[i][0]);
                break;
            case "Challenge":
                this.challenge.push(this.responses[i][0]);
                break;
            case "Ease-of-Control":
                this.ease.push(this.responses[i][0]);
                break;
            case "Progress Feedback":
                this.progress.push(this.responses[i][0]);
                break;

          }
          }
        }

        this.total.push(this.average(this.meaning));
        this.total.push(this.average(this.mastery));
        this.total.push(this.average(this.curiosity));
        this.total.push(this.average(this.immersion));
        this.total.push(this.average(this.autonomy));
        this.total.push(this.average(this.goals));
        this.total.push(this.average(this.audioVisual));
        this.total.push(this.average(this.challenge));
        this.total.push(this.average(this.ease));
        this.total.push(this.average(this.progress));

        for (var j = 0; j < this.total.length; j++){                   // figure out what denominator to use, accoutning for unanswered q's
          if (j < 5 && this.total[j] !== 0){
            aeDenominator += 1;
          } else if (j >= 5 && this.total[j] !==0){
            dyDenominator += 1;
          }
        }

        for (var k = 0; k < this.total.length; k++){                   // split total score into aesthetics and dynamics scores
          if (k < 5){
            this.aestheticsScore += this.total[k]/aeDenominator;       // first 5 belong to aesthetics group
          } else if (k >= 5){
            this.dynamicsScore += this.total[k]/dyDenominator;         // last 5 belong to dynamics group
          }

        }

        this.aestheticsDynamics.push(this.aestheticsScore);
        this.aestheticsDynamics.push(this.dynamicsScore);

        this.overAllScore = this.checkNaN(this.aestheticsScore, this.dynamicsScore);
        console.log(this.aestheticsScore);
        console.log(this.dynamicsScore);
        console.log(this.overAllScore);



      },

      average(arr){
        var avg = 0;

        if (arr.length != 0) {
          for (var i = 0; i < arr.length; i++){
            avg += arr[i]/arr.length;
          }
        }

        return avg;
      },

      checkNaN(aesthetics, dynamics){
        if (isNaN(aesthetics)){
          return dynamics;
        } else if (isNaN(dynamics)){
          return aesthetics;
        } else {
          return (dynamics + aesthetics)/2;
        }
      },

      handler(){
        this.updateScore();
        this.submit();
        this.currentPage++;
      }



}}
</script>
