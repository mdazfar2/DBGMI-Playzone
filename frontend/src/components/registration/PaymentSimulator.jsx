import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { formatCurrency, simulatePaymentProcessing, generateTransactionId } from '../../utils/helpers';

const PaymentSimulator = ({ tournament, playerName, paymentMethod, onBack, onSuccess }) => {
  const [status, setStatus] = useState('pending');
  const [transactionId, setTransactionId] = useState('');

  const handlePayNow = async () => {
    setStatus('processing');

    try {
      const paymentSuccessful = await simulatePaymentProcessing();

      if (paymentSuccessful) {
        setTransactionId(generateTransactionId());
        setStatus('success');

        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setStatus('failed');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setStatus('failed');
    }
  };

  let content;

  if (status === 'pending') {
    content = (
      <>
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-medium text-white mb-3">Payment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Tournament</span>
              <span className="text-white">{tournament.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Player</span>
              <span className="text-white">{playerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Method</span>
              <span className="text-white">{paymentMethod}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-700 mt-2">
              <span className="text-gray-400">Entry Fee</span>
              <span className="text-white font-bold">{formatCurrency(tournament.entryFee)}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Click the button below to simulate a payment. In a real implementation, 
          this would redirect to the actual payment gateway.
        </p>

        <div className="space-y-3">
          <Button variant="primary" onClick={handlePayNow} fullWidth>
            Pay Now {formatCurrency(tournament.entryFee)}
          </Button>
          <Button variant="secondary" onClick={onBack} fullWidth>
            Go Back
          </Button>
        </div>
      </>
    );
  } else if (status === 'processing') {
    content = (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 size={48} className="text-yellow-500 animate-spin mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Processing Payment</h3>
        <p className="text-gray-400 text-center">
          Please wait while we process your payment...
        </p>
      </div>
    );
  } else if (status === 'success') {
    content = (
      <div className="flex flex-col items-center justify-center py-8">
        <CheckCircle size={48} className="text-green-500 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Payment Successful!</h3>
        <p className="text-gray-400 text-center mb-4">
          Your payment has been processed successfully.
        </p>
        <div className="bg-gray-800 p-3 rounded-md w-full mb-4">
          <p className="text-xs text-gray-400">Transaction ID</p>
          <p className="text-sm text-white font-mono">{transactionId}</p>
        </div>
        <p className="text-sm text-gray-400 text-center">
          You will be redirected to the confirmation page...
        </p>
      </div>
    );
  } else if (status === 'failed') {
    content = (
      <div className="flex flex-col items-center justify-center py-8">
        <XCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Payment Failed</h3>
        <p className="text-gray-400 text-center mb-6">
          We couldn't process your payment. Please try again.
        </p>
        <div className="space-y-3 w-full">
          <Button variant="primary" onClick={handlePayNow} fullWidth>
            Try Again
          </Button>
          <Button variant="secondary" onClick={onBack} fullWidth>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {status === 'pending' && (
        <div className="mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Registration
          </button>
        </div>
      )}

      <Card>
        <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="font-bold text-xl text-white">Payment</h2>
          <p className="text-gray-400 text-sm mt-1">{tournament.name}</p>
        </div>

        <div className="p-6">
          {content}
        </div>
      </Card>
    </div>
  );
};

export default PaymentSimulator;
