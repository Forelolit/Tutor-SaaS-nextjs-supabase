export function getSubmissionStatus(status: string) {
    switch (status) {
        case 'submitted':
            return {
                label: 'Need review',
                variant: 'secondary' as const,
            };

        case 'graded':
            return {
                label: 'Graded',
                variant: 'default' as const,
            };

        case 'rejected':
            return {
                label: 'Rejected',
                variant: 'destructive' as const,
            };

        default:
            return {
                label: status,
                variant: 'outline' as const,
            };
    }
}
