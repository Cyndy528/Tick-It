var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000';

describe('Tickets', function() {
  it('should list ALL tickets on GET /api/tickets', function (done) {
    request(baseUrl + '/api/tickets', function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should add a NEW ticket on POST /api/tickets', function (done) {
    request.ticket(
      {
        url: baseUrl + '/api/tickets',
        form: {
          completed: true,
          department: 'Engineering', 
          description: 'Need help with computer equipment',
          createdAt: 'createdAt'
        }

      }, 

      function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it('should list a SINGLE ticket on GET /api/ticket/:id', function (done) {
    request(baseUrl + '/api/tickets', function (error, response, body) {
      var allTickets = JSON.parse(body).tickets;
      var singleTicket = allTickets[allTickets.length - 1];
      request(baseUrl + '/api/tickets/' + singleTicket._id, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('should update a SINGLE ticket on PUT /api/tickets/:id', function (done) {
    request(baseUrl + '/api/tickets', function (error, response, body) {
      var allTickets = JSON.parse(body).tickets;
      var singleTicket = allTickets[allTickets.length - 1];
      request.put(
        {
          url: baseUrl + '/api/tickets/' + singleTicket._id,
          form: {
          completed: true,
          department: 'UX Design ', 
          description: 'Need assistance with conference room projector',
          createdAt: 'createdAt'
        }

      }, 

        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });

  it('should delete a SINGLE ticket on DELETE /tickets/:id', function (done) {
    request(baseUrl + '/api/tickets', function (error, response, body) {
      var allTickets = JSON.parse(body).tickets;
      var singleTicket = allTickets[allTickets.length - 1];
      request.del(baseUrl + '/api/tickets/' + singleTicket._id, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});