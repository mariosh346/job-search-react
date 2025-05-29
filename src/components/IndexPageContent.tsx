import JobList from './JobList';
import SearchFilters from './SearchFilters';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function IndexPageContent() {
    const t = useTranslations('IndexPage');

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                }}
            >
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    {t('title')}
                </Typography>
                <SearchFilters />
                <JobList />

            </Box>
        </Container>
    );
}
