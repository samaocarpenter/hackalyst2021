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
    "question": "Phew, a well deserved break after being barraged with these hard hitting catalyst questions. What is 0∫∞ (sin x) dx?",
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
    "answer": "",
    "choices": [
        "Made a Hit",
        "Took a Shit"
  ],
  "messages": {
    "Made a Hit":"If this was anywhere on your spotify wrapped I would be supremely disappointed",
    "Took a Shit":"Josh should sign you as his manager this is a much better name"
  }
  
},
{
    "question": "Congrats, you’ve gotten to the end of this quiz! Last question: What are you most looking forward to in Catalyst?",
    "answer": "",
    "choices": [
        "Meeting more members!",
        "Test banks :) jk but not really",
        "Yung Josh’s new single",
        "Being united with your big!"
  ],
  "messages": {
    "Meeting more members!":"That's so cute!",
    "Test banks :) jk but not really":"Bruh",
    "Yung Josh’s new single": "Stop cappin",
    "Being united with your big": "Awwwww adorable"
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
                "How many cookies did you individually click?":{}, 
                "Did you ever have the privilege of being hazed by a catalyst member? *cough* herleen *cough*":{}, 
                "How many sigs have you finished so far?":{}, 
                "Who’s your favorite rush chair?":{}, 
                "What is Catalyst’s favorite table? (there is a correct answer)":{}, 
                "Phew, a well deserved break after being barraged with these hard hitting catalyst questions. What is 0∫∞ (sin x) dx?":{}, 
                "What is Yung Josh’s debut song called?":{}
            },
            styled: {
                background: "pink"
            },
            quizList: ['Catalyst NME']
        }
    },

    methods: {
        toggleLinks () {
            this.quizName = null;
            this.reset();
            this.questionData = {};
            this.styled['background'] = 'pink';
            this.quizAnswers = {};
            this.messages = {
                "How many cookies did you individually click?":{}, 
                "Did you ever have the privilege of being hazed by a catalyst member? *cough* herleen *cough*":{}, 
                "How many sigs have you finished so far?":{}, 
                "Who’s your favorite rush chair?":{}, 
                "What is Catalyst’s favorite table? (there is a correct answer)":{}, 
                "Phew, a well deserved break after being barraged with these hard hitting catalyst questions. What is 0∫∞ (sin x) dx?":{}, 
                "What is Yung Josh’s debut song called?":{}
            };
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
            this.showQuiz(data);
        },

        getMessages() {
            let i = 0;
            for (var m in this.questionData) {
                this.messages[m] = this.questionData[m].messages;
                i+=1;
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
                this.displayMessage(quest);
            });
            
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

        displayMessage (quest) {
            let question  = this.questionData[quest];
            let pick = question.trueChoice;
            let mess = this.messages[quest][pick];
            
            document.getElementById('result').innerHTML = mess + '<br>';
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
