const data = 
[{
    "question": "How many cookies did you individually click?",
    "answer": "",
    "choices": [
        "0 - 100",
        "101 - 50,000",
        "50,000 - 14 quintillion",
        "14 quintillion +"
  ],
  "messages": {
    "0 - 100": "congrats, you actually have a life",
    "101 - 50,000":"incredibly mediocre",
    "50,000 - 14 quintillion":"you are huge over/under achiever, we will never know ig",
    "14 quintillion +":"Ok John Zehr"
  }
},
{
    "question": "Did you ever have the privilege of being hazed by a catalyst member? *cough* herleen *cough*",
    "answer": "",
    "choices": [
        "Yes",
        "No"
  ],
  "messages": {
      "Yes":"if you’re into that kind of stuff ;)",
        "No":"what are you waiting for?"
    }
},
{
    "question": "How many sigs have you finished so far?",
    "answer": "",
    "choices": [
        "0 - 5",
        "6 - 8",
        "9 - 10",
        "10+"
  ],
  "messages": {
    "0 - 5":"auto C U T man",
    "6 - 8":"Almost there! Time to hit up lisa for mogetea!",
    "9 - 10":"Home stretch!",
    "10+":"Ugh. Tryhard."
  }
},
{
    "question": "Who’s your favorite rush chair?",
    "answer": "",
    "choices": [
        "Helen Xiao",
        "Josh Guo",
        "Joshua Sauter",
        "Lisa Tang"
  ],
  "messages": {
    "Helen Xiao":"Rush Kappa Alpha Theta woohoo!",
    "Josh Guo":"Wrong. try again.",
    "Joshua Sauter":"We love the diversity",
    "Lisa Tang":"Is your only personality trait mogetea?"
  }
},
{
    "question": "What is Catalyst’s favorite table? (there is a correct answer)",
    "answer": "",
    "choices": [
        "Air-table",
        "Pong-table",
        "Pool-table",
        "Summer Internship at Facebook-table"
  ],
  "messages": {
    "Air-table":"Right?? Now submit this airtable form for breathing www.airtable.com/foh",
    "Pong-table":"Really?",
    "Pool-table":"Bruh.",
    "Summer Internship at Facebook-table":"Oh yes, we're talking about you"
  }
},
{
    "question": "Phew, a well deserved break after being barraged with these hard hitting catalyst questions. What is 0sin(x)xdx ?",
    "answer": "",
    "choices": [
        "pi / 2",
        "pi",
        "I’d rather not answer this question it induces PTSD from my KUMON days"
  ],
  "messages": {
    "pi / 2":"Wow you are either really smart or you took the time to use wolfram-alpha, or you just got lucky.",
    "pi":"Nah fam",
    "I’d rather not answer this question it induces PTSD from my KUMON days":"Sheesh, kinda impressed that you were doing laplace transformations in pre-school"
  }
},
{
    "question": "What is Yung Josh’s debut song called?",
    "answer": "Took a Shit",
    "choices": [
        "Made a Hit",
        "Took a Shit"
  ],
  "messages": {
    "Made a Hit":"If this was anywhere on your spotify wrapped I would be supremely disappointed",
    "Took a Shit":"Josh should sign you as his manager this is a much better name"
  }
  
}]



const app = new Vue ({
    el: '#app',
    data () {
        return {
            quizName: null,
            quizAnswers: {},
            questionData: {},
            messages: {
                "How many cookies did you individually click?":[], 
                "Did you ever have the privilege of being hazed by a catalyst member? *cough* herleen *cough*":[], 
                "How many sigs have you finished so far?":[], 
                "Who’s your favorite rush chair?":[], 
                "What is Catalyst’s favorite table? (there is a correct answer)":[], 
                "Phew, a well deserved break after being barraged with these hard hitting catalyst questions. What is 0sin(x)xdx ?":[], 
                "What is Yung Josh’s debut song called?":[]
            },
            styled: {
                background: "lightblue"
            },
            quizList: ['Random Catalyst Stuff Yolo']
        }
    },

    methods: {
        // fetchData (quizKey) {
        //     // fetch(`./data/quiz_${quizKey}.json`)
        //     //     .then(response => response.json())
        //     //     .then(data => {
        //     //         this.showQuiz(data);
        //     //     })
        //     //     .catch(error => console.error(error));
        //     // let data = require('./data/quiz_${quizKey}.json');
        //     // this.showQuiz(data);
        //     this.showQuiz(data);
        // },

        toggleLinks () {
            this.quizName = null;
            this.reset();
            this.questionData = {};
            this.styled['background'] = 'green';
            this.quizAnswers = {};
            this.messages = [];
        },

        toMap (jsondata) {
            ret = {};
            jsondata.forEach(quest => {
                ret[quest.question] = quest;
            });
            return ret;
        },
        
        showQuiz (data) {
            for (var i=0; i < this.questionData.length-1; i++) {
                this.quizAnswers[this.questionData[i].question] = this.questionData[i].answer;
            }
            this.questionData = this.toMap(data);
            console.log(this.questionData);
        },
        
        diffStyles () {
            if (this.quizName == 'basketball') {
                this.styled['background'] = '#f18f0e';
            } else if (this.quizName == 'marvel') {
                this.styled['background'] = '#f70810';
            } else if (this.quizName == 'elements') {
                this.styled['background'] = '#3e4ac1';
            }
            // this.fetchData(this.quizName);
            this.showQuiz(data);
            // this.showQuiz(Marvel);
        },

        getMessages() {
            let i = 0;
            for (var m in this.questionData) {
                if (this.questionData[m].messages) {
                    this.messages[i] = this.questionData[m].messages;
                    i+=1;
                }
            }
            console.log(this.messages);
        },

        // process user submission of their answers
        processAnswers () {
            this.getMessages();
            let numCorrect = this.countCorrectAnswers();
            // STOP if a question is not answered
            if (numCorrect < 0) {
                window.alert('You must answer all questions first.');
                return;
            }

            // otherwise report results for user to see
            this.reportResults(numCorrect, Object.keys(this.questionData).length);
        },

        // reset quiz to its original state so it can be taken again
        reset () {
            // clear report
            document.getElementById('result').innerHTML = '';
            document.getElementById('questions').innerHTML = '';
            
            // clear selections
            let inputs = document.querySelectorAll('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
                inputs[i].disabled = false;
            }
            // clear highlights
            let lis = document.querySelectorAll('li');
            for (let i = 0; i < lis.length; i++) {
                let li = lis[i];
                li.classList.remove('correct', 'incorrect');
            }
        },


        // useful function to returns user's selected answer
        getChoice (name) {
            let element = document.querySelector(`input[name="${name}"]:checked`);
            if (element == null) {
                return -1;
            } else {
                return element.value;
            }
        },

        // utility function to make code more readable
        getCorrectAnswer (name) {
            return this.quizAnswers[name];
        },

        // check how many answers match correct ones
        countCorrectAnswers () {
            let numCorrect = 0;
            Object.keys(this.questionData).forEach(quest => {
                let question  = this.questionData[quest];
                let choice = question.trueChoice;
                if (choice == null) {
                    return -1;
                }
                else {
                    if (question.answer == choice) {
                        numCorrect += 1;
                    }
                    this.highlightResponse(question.question, choice, question.answer);
                }
            });
            this.displayMessage();
            return numCorrect;
        },

        // change the classes to reflect results of user's selections
        highlightResponse (parent, choice, correctAnswer) {
            let items = document.getElementById(parent).querySelectorAll('li');
            items.forEach(li => {
                let input = li.querySelector('input');
                if (input.value == choice) {
                    li.className = (choice === correctAnswer ? 'correct' : 'incorrect');
                }
                // do allow the answer to be changed after submission
                input.disabled = true;
            });
        },

        // show percent correct
        reportResults (numCorrect, total) {
            let pct = Math.round(numCorrect * 100 / total);
            document.getElementById('result').innerHTML = `You got ${pct}% correct`;
            let mess = "";
            //this.getMessages();
            // if (pct == 100) {
            //     mess = this.messages[2];
            // } else if (pct > 40) {
            //     mess = this.messages[1];
            // } else {
            //     mess = this.messages[0];
            // }
            

            // get it to print after every question answered rather than
            // all at once at the end
            document.getElementById('message').innerHTML = mess;
        },

        displayMessage () {
            Object.keys(this.questionData).forEach(quest => {
                let question  = this.questionData[quest];
                let pick = question.trueChoice;
                for (var m in this.messages[quest]) {
                    document.getElementById('indyMessage').innerHTML += m[pick] + '<br>';
                }
            });
            
        }
        
    },
    watch: {
        quizName () {
            this.diffStyles();
            displayBox = {};
        },
        trueChoice() {
            this.displayMessage();
        }
    }

});
