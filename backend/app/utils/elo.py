# Elo rating calculation functions

def calculate_elo(winner_rating, loser_rating, k=32):
    """Calculate new Elo ratings for winner and loser."""
    expected_win = 1 / (1 + 10 ** ((loser_rating - winner_rating) / 400))
    winner_new = winner_rating + k * (1 - expected_win)
    loser_new = loser_rating + k * (0 - (1 - expected_win))
    return round(winner_new), round(loser_new)

