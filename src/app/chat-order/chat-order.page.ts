import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { DbService } from '../api/db.service';
import { MatcherService } from '../api/matcher.service';

@Component({
  selector: 'app-chat-order',
  templateUrl: './chat-order.page.html',
  styleUrls: ['./chat-order.page.scss'],
})
export class ChatOrderPage implements OnInit {

  //static = "volume-high-outline";
  status = "mic";
  isRecording:boolean = false;
  isValidResponse = false;
  response: string;
  botMessage: string;
  categories: any;
  categorie: any;
  step: number = 0;
  tmpStatus = "x";
  log="";

  workflow = ["Hi, What do you want to eat ?", "Which $ you want ?", "s"];


  constructor(private speechRecognition: SpeechRecognition, 
    private cd: ChangeDetectorRef, 
    private dbService: DbService,
    private matcherService: MatcherService) { 
      this.categories = dbService.getCategories();
      //this.startOrdering();
    }

  ngOnInit() {
  }

  getpermission() {
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if(!hasPermission) {
        // Request permissions
        this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }
    })
  }

  startRecord() {
    
    this.log+="- start recording";
    this.getpermission();

    let options = {
      language: 'en-US'
      //showPopup: false
    }
    this.speechRecognition.startListening(options).subscribe(
      matches => {
      this.response = matches[0];
      this.verifyTheRecorderOrder(matches[0]);
      this.cd.detectChanges();

    }, error=>  {
      this.log+="- Error when recording :"+error;
    });
    this.isRecording = true;
    this.tmpStatus = "is recording...";
    this.status = "mic";
  }
  stopRecord() {
    this.speechRecognition.stopListening().then(()=>{
      this.isRecording=false;
    });
  }

  startOrdering() {
    this.log+="- start the order"
    if(!this.isRecording) {
      this.botTalking();
    } else {
     // this.stopRecord();
    }
  }

  botTalking() {
    this.log+="- the bot is talking";
    this.tmpStatus = "The bot is talking...";
    this.status = "volume-high-outline";
    this.botMessage = this.workflow[this.step];
    this.startRecord();
  }

  verifyTheRecorderOrder(order: string) {
    this.log+="- verifie the recorded order";
    this.isRecording=false;
    var max = 0;
    var matchedOrder = null;
    for (let m of this.categories) {
      var currentMatch = this.matcherService.checkSimilarity(order.toLowerCase(), m.name);
      if( currentMatch > max) {
        max = currentMatch;
        matchedOrder = m  ;
      }
    }

    if(max > 0.20) {
      this.tmpStatus = "Valid order...";
      this.categorie = matchedOrder.name;
      // go to the next step
      this.botTalking();
      this.step++;
    } else {
        // invalid order, re answer
        this.tmpStatus = "Invalid order...";
        this.invalidOrder();
    }
  }

  invalidOrder() {
    this.botMessage = "We could'nt understand what you want? please re order ?";
    this.startRecord();
  }

}
