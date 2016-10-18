/* tslint:disable:no-unused-variable */
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { IAppService, AppService } from './app.service';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

class AppServiceMock implements IAppService {
  get(id: string): Observable<any> {
    return Observable.of({
        id: id,
        descricao: 'Task'
      });
  }
  query(filter: any): Observable<Array<any>> {
    return Observable.of([
        {
          id: '1',
          descricao: 'Task'
        }
      ]);
  }
  post(task: any): Observable<any> {
    return Observable.of({
        id: '1',
        descricao: 'Task'
      });
  }
  put(id: string, update: any): Observable<void> {
    return Observable.of(null);
  }
  delete(id: string): Observable<void> {
    return Observable.of(null);
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: AppService, useClass: AppServiceMock }
      ]
    })
    .compileComponents();
  }));
  it('should instantiate the component', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  }));
  it('should get all tasks on init', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.tarefas.length).toBe(1);
  }));
  it('should be able to add a new task', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.ngOnInit();
    component.novo();
    expect(component.tarefas.length).toBe(2);
  }));
  it('should be able to update a task', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.ngOnInit();
    component.atualizar(component.tarefas[0]._id, 'descricao', 'Task 2');
    expect(component.tarefas.length).toBe(1);
  }));
  it('should be able to delete a task', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    component.ngOnInit();
    component.deletar(0, component.tarefas[0]._id);
    expect(component.tarefas.length).toBe(0);
  }));
});