import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.css'],
})
export class AiComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const script = document.createElement('script');
    script.onload = () => {
      (window as any).voiceflow.chat.load({
        verify: { projectID: '65ed5682175bb21b06b58009' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    document.body.appendChild(script);
  }
}
