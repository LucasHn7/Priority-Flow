<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{

    protected $table = 'tickets';

    protected $fillable = [
        'title',
        'description',
        'client_type',
        'status',
        'urgency',
    ];

    const CLIENT_TYPE_FREE = 'GRATUITO';
    const CLIENT_TYPE_BASIC = 'BASICO';
    const CLIENT_TYPE_PREMIUM = 'PREMIUM';

    const STATUS_PENDING = 'PENDENTE';
    const STATUS_CLASSIFIED = 'CLASSIFICADO';

    const URGENCY_CRITICAL = 'CRITICA';
    const URGENCY_HIGH = 'ALTA';
    const URGENCY_MEDIUM = 'MEDIA';
    const URGENCY_LOW = 'BAIXA';
}
