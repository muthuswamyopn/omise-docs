const fs = require('fs');

// Read the original schema
const schema = JSON.parse(fs.readFileSync('schema.json', 'utf8'));

// Define the error schema
const errorSchema = {
  type: 'object',
  properties: {
    object: {
      type: 'string',
      default: 'error',
      pattern: 'error'
    },
    location: {
      type: 'string',
      description: 'The API endpoint that returned the error'
    },
    code: {
      type: 'string',
      description: 'Machine-readable error code',
      enum: [
        'authentication_failure',
        'not_found',
        'invalid_card',
        'invalid_card_token',
        'missing_card',
        'invalid_source',
        'used_token',
        'bad_request',
        'failed_capture',
        'failed_reverse',
        'failed_expire',
        'processed_charge',
        'insufficient_fund',
        'payment_rejected',
        'stolen_or_lost_card',
        'failed_fraud_check',
        'invalid_account_number',
        'invalid_security_code',
        'expired_card',
        'failed_processing'
      ]
    },
    message: {
      type: 'string',
      description: 'Human-readable error message'
    }
  },
  required: ['object', 'code', 'message']
};

// Add error schema to components
schema.components.schemas.error = errorSchema;

// Define error responses templates
const error400 = {
  description: 'Bad Request - The request is malformed or contains invalid parameters',
  content: {
    'application/json': {
      schema: { '$ref': '#/components/schemas/error' },
      examples: {
        bad_request: {
          summary: 'Invalid parameters',
          value: {
            object: 'error',
            location: 'https://api.omise.co/charges',
            code: 'bad_request',
            message: 'amount must be greater than 0'
          }
        },
        missing_card: {
          summary: 'Missing payment method',
          value: {
            object: 'error',
            location: 'https://api.omise.co/charges',
            code: 'missing_card',
            message: 'card, source, or customer is required'
          }
        },
        invalid_card_token: {
          summary: 'Invalid or used card token',
          value: {
            object: 'error',
            location: 'https://api.omise.co/charges',
            code: 'invalid_card_token',
            message: 'card token is invalid or was already used'
          }
        }
      }
    }
  }
};

const error401 = {
  description: 'Unauthorized - The API key is invalid or missing',
  content: {
    'application/json': {
      schema: { '$ref': '#/components/schemas/error' },
      example: {
        object: 'error',
        location: 'https://api.omise.co',
        code: 'authentication_failure',
        message: 'authentication failed'
      }
    }
  }
};

const error402 = {
  description: 'Payment Required - The payment provider declined or could not process the payment',
  content: {
    'application/json': {
      schema: { '$ref': '#/components/schemas/error' },
      examples: {
        insufficient_fund: {
          summary: 'Insufficient funds',
          value: {
            object: 'error',
            location: 'https://api.omise.co/charges',
            code: 'insufficient_fund',
            message: 'insufficient funds in the account or the card has reached the credit limit'
          }
        },
        payment_rejected: {
          summary: 'Payment rejected',
          value: {
            object: 'error',
            location: 'https://api.omise.co/charges',
            code: 'payment_rejected',
            message: 'payment rejected'
          }
        },
        stolen_or_lost_card: {
          summary: 'Stolen or lost card',
          value: {
            object: 'error',
            location: 'https://api.omise.co/charges',
            code: 'stolen_or_lost_card',
            message: 'card is stolen or lost'
          }
        }
      }
    }
  }
};

const error404 = {
  description: 'Not Found - The resource does not exist',
  content: {
    'application/json': {
      schema: { '$ref': '#/components/schemas/error' },
      example: {
        object: 'error',
        location: 'https://api.omise.co/charges/chrg_test_invalid',
        code: 'not_found',
        message: 'charge chrg_test_invalid was not found'
      }
    }
  }
};

const errorCapture400 = {
  description: 'Bad Request - The system cannot capture this charge',
  content: {
    'application/json': {
      schema: { '$ref': '#/components/schemas/error' },
      example: {
        object: 'error',
        location: 'https://api.omise.co/charges/chrg_test_.../capture',
        code: 'failed_capture',
        message: 'charge was already captured'
      }
    }
  }
};

const errorReverse400 = {
  description: 'Bad Request - The system cannot reverse this charge',
  content: {
    'application/json': {
      schema: { '$ref': '#/components/schemas/error' },
      example: {
        object: 'error',
        location: 'https://api.omise.co/charges/chrg_test_.../reverse',
        code: 'failed_reverse',
        message: 'charge was already captured'
      }
    }
  }
};

const errorExpire400 = {
  description: 'Bad Request - The system cannot expire this charge',
  content: {
    'application/json': {
      schema: { '$ref': '#/components/schemas/error' },
      example: {
        object: 'error',
        location: 'https://api.omise.co/charges/chrg_test_.../expire',
        code: 'failed_expire',
        message: 'charge is not in pending status'
      }
    }
  }
};

const errorMarkAs400 = {
  description: 'Bad Request - The system already processed this charge',
  content: {
    'application/json': {
      schema: { '$ref': '#/components/schemas/error' },
      example: {
        object: 'error',
        location: 'https://api.omise.co/charges/chrg_test_.../mark_as_paid',
        code: 'processed_charge',
        message: 'charge is not in pending status'
      }
    }
  }
};

// Add error responses to charges endpoints
const chargesEndpoints = {
  '/charges': {
    post: { '400': error400, '401': error401, '402': error402 },
    get: { '401': error401 }
  },
  '/charges/search': {
    get: { '401': error401 }
  },
  '/charges/{id}': {
    get: { '401': error401, '404': error404 },
    patch: { '400': error400, '401': error401, '404': error404 }
  },
  '/charges/{id}/capture': {
    post: { '400': errorCapture400, '401': error401, '404': error404 }
  },
  '/charges/{id}/reverse': {
    post: { '400': errorReverse400, '401': error401, '404': error404 }
  },
  '/charges/{id}/expire': {
    post: { '400': errorExpire400, '401': error401, '404': error404 }
  },
  '/charges/{id}/mark_as_paid': {
    post: { '400': errorMarkAs400, '401': error401, '404': error404 }
  },
  '/charges/{id}/mark_as_failed': {
    post: { '400': errorMarkAs400, '401': error401, '404': error404 }
  },
  '/charges/{id}/refunds': {
    post: { '400': error400, '401': error401, '404': error404 },
    get: { '401': error401, '404': error404 }
  },
  '/charges/{id}/refunds/{refund_id}': {
    get: { '401': error401, '404': error404 }
  },
  '/charges/{id}/disputes': {
    get: { '401': error401, '404': error404 },
    post: { '400': error400, '401': error401, '404': error404 }
  },
  '/charges/{id}/events': {
    get: { '401': error401, '404': error404 }
  },
  '/charges/schedules': {
    get: { '401': error401 }
  },
  '/charges/schedules/search': {
    get: { '401': error401 }
  }
};

// Apply error responses to schema
for (const [path, methods] of Object.entries(chargesEndpoints)) {
  if (schema.paths[path]) {
    for (const [method, errors] of Object.entries(methods)) {
      if (schema.paths[path][method]) {
        schema.paths[path][method].responses = {
          ...schema.paths[path][method].responses,
          ...errors
        };
      }
    }
  }
}

// Write the updated schema
fs.writeFileSync('schema-with-errors.json', JSON.stringify(schema, null, 2));

console.log('Schema updated successfully!');
console.log('Added error schema to components/schemas');
console.log('Added error responses to charges endpoints');

// Verify the changes
const updated = JSON.parse(fs.readFileSync('schema-with-errors.json', 'utf8'));
console.log('\nVerification:');
console.log('- Error schema exists:', !!updated.components.schemas.error);
console.log('- POST /charges has 400:', !!updated.paths['/charges'].post.responses['400']);
console.log('- POST /charges has 401:', !!updated.paths['/charges'].post.responses['401']);
console.log('- POST /charges has 402:', !!updated.paths['/charges'].post.responses['402']);
console.log('- GET /charges/{id} has 404:', !!updated.paths['/charges/{id}'].get.responses['404']);
console.log('- POST /charges/{id}/capture has 400:', !!updated.paths['/charges/{id}/capture'].post.responses['400']);
