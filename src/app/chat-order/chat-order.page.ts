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
    private matcherService: MatcherService) { }

  ngOnInit() {
  }

}
