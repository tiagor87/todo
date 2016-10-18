import { HttpModule, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AppService } from './app.service';
import { TestBed, async, inject } from '@angular/core/testing';
import './rxjs-operators';

describe('AppService', () => {
    beforeEach(async(() => {
        // Test settings
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            declarations: [],
            providers: [
                AppService,
                {provide: XHRBackend, useClass: MockBackend}
            ]
        })
        .compileComponents();
    }));

  it('should be able to get all tasks', async(inject([XHRBackend, AppService], (backend: MockBackend, service: AppService) => {
      // Mock settings
      backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockRespond(new Response(
              new ResponseOptions({
                  body: [
                      {_id: 1, descricao: 'Task 1'}
                  ]
              })
          ));
      });

      // Test
      service.query({})
        .subscribe((tasks: Array<any>) => expect(tasks.length).toBe(1));
  })));

  it('should be able to get a task by id', async(inject([XHRBackend, AppService], (backend: MockBackend, service: AppService) => {
      // Mock settings
      backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:3000/1');
          expect(connection.request.method).toBe(RequestMethod.Get);
          connection.mockRespond(new Response(
              new ResponseOptions({
                  body: {_id: '1', descricao: 'Task 1'}
              })
          ));
      });

      // Test
      service.get('1')
        .subscribe((task: any) => expect(task).not.toBeNull);
  })));

  it('should be able to post a task', async(inject([XHRBackend, AppService], (backend: MockBackend, service: AppService) => {
      // Data mocks
      let task = {_id: '1', descricao: ''};

      // Mock settings
      backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:3000');
          expect(connection.request.method).toBe(RequestMethod.Post);
          expect(connection.request.json()).not.toBeNull;
          connection.mockRespond(new Response(
              new ResponseOptions({
                  body: task
              })
          ));
      });

      // Test
      service.post({})
        .subscribe((t: any) => expect(t).toBe(task));
  })));

  it('should be able to update a task', async(inject([XHRBackend, AppService], (backend: MockBackend, service: AppService) => {
      // Data mocks
      let data = {descricao: 'Task'};

      // Mock settings
      backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:3000/1');
          expect(connection.request.method).toBe(RequestMethod.Put);
          expect(connection.request.json()).toBe(data);
          connection.mockRespond(new Response(
              new ResponseOptions({})
          ));
      });

      // Test
      service.put('1', data)
        .subscribe(() => {});
  })));

  it('should be able to delete a task', async(inject([XHRBackend, AppService], (backend: MockBackend, service: AppService) => {
      // Data mocks
      const data = {descricao: 'Task'};

      // Mock settings
      backend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://localhost:3000/1');
          expect(connection.request.method).toBe(RequestMethod.Delete);
          connection.mockRespond(new Response(
              new ResponseOptions({})
          ));
      });

      // Test
      service.delete('1')
        .subscribe(() => {});
  })));
});
