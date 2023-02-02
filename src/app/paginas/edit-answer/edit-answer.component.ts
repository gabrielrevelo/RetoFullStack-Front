import { Component, OnInit , Input} from '@angular/core';
import { AnswerI } from 'src/app/models/answer-i';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { QuestionService } from 'src/app/Service/question.service';


@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css'],
  providers: [MessageService],
})
export class EditAnswerComponent implements OnInit {

  @Input() answer: AnswerI={
    id: '',
    userId:'',
    questionId:'',
    answer:'',
    position:0
  };

  constructor(
    private modalService: NgbModal,
    private messageService: MessageService,
    private services: QuestionService,
  ) { }

  ngOnInit(): void {

  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  saveAnswer(): void {

    this.services.editAnswer(this.answer).subscribe({
      next: (v) => {
        console.log(v)
        if(v){
          this.modalService.dismissAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Se ha agregado la respuesta',

           });
           setTimeout(() => {
           window.location.reload();
         }, 1000);
        }
      },
      error: (e) =>
      {
        console.log(e)
        if(e.status == 200){
          this.modalService.dismissAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Respuesta editada correctamente',

           });
           setTimeout(() => {
           window.location.reload();
         }, 1000);
        }
      //   this.modalService.dismissAll();
      //   this.messageService.add({
      //   severity: 'error',
      //   summary: 'Rectifique los datos',
      //   detail: '(Campos Vacios)-Intente de Nuevo',
      // })
    },
      complete: () => console.info('complete'),
    });
  }

}
