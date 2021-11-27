import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StoreSummaryService } from '../store-summary/store-summary.service';
import { StoreSummary } from '../store-summary/store-summary';
import { CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import * as Quill from 'quill';
import { KeypadComponent } from 'ngx-numaric-keypad';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})

export class DashComponent implements OnInit{
  scale: string = '0.5';

  entered(event: CdkDragEnter) {
    moveItemInArray(this.miniCardData, event.item.data, event.container.data);
  }
  cardLayout = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          textEditor: { cols: 1, rows: 4 },
        };
      }

     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        textEditor: { cols: 4, rows: 4 },
      };
    })
  );

  miniCardData: StoreSummary[];

  constructor(private breakpointObserver: BreakpointObserver, private summaryService: StoreSummaryService) {}

  ngOnInit() {
    this.summaryService.getStoreSummary().subscribe({
      next: summaryData => {
        this.miniCardData = summaryData;
      }
    });
    hello();
  }
  getNumberValue(numberD: any) {
    console.log(numberD, "number")
  }
}
function hello() {
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];
  var fullEditor = new Quill('#full-editor', {
  modules: {
    'toolbar': toolbarOptions,
    'link-tooltip': true
  },
  theme: 'snow'
  });
}

